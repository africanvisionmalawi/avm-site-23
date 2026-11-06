// Small bits of interactivity that used to be React state.

// Mobile navigation drawer.
function initDrawer() {
  const root = document.querySelector("[data-drawer-root]");
  if (!root) return;
  const parts = root.querySelectorAll("[data-drawer]");
  root.querySelectorAll("[data-drawer-toggle]").forEach((el) =>
    el.addEventListener("click", () => parts.forEach((p) => p.classList.toggle("open")))
  );
}

// Page-title search (desktop header and mobile drawer).
let searchIndex;
async function loadSearchIndex() {
  if (!searchIndex) {
    searchIndex = fetch("/search.json").then((r) => r.json()).catch(() => []);
  }
  return searchIndex;
}

function initSearch(cont) {
  const input = cont.querySelector("[data-search-input]");
  const toggle = cont.querySelector("[data-search-toggle]");
  let active = false;
  let list = null;
  let renderId = 0;

  const render = async () => {
    const id = ++renderId;
    const query = input.value;
    list?.remove();
    list = null;
    if (!active || !query) return;
    const q = query.toLowerCase();
    const results = (await loadSearchIndex()).filter((p) => p.title.toLowerCase().includes(q)).slice(0, 6);
    // A newer keystroke/blur may have happened while the index was loading.
    if (id !== renderId || !active) return;
    list = document.createElement("ul");
    list.className = "search__search-list";
    if (results.length) {
      for (const { title, path } of results) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = path;
        a.textContent = title;
        li.append(a);
        list.append(li);
      }
    } else {
      const li = document.createElement("li");
      li.textContent = "No results found";
      list.append(li);
    }
    cont.append(list);
  };

  const onOutsideClick = (event) => {
    if (!cont.contains(event.target)) {
      active = false;
      window.removeEventListener("click", onOutsideClick);
      render();
    }
  };

  toggle.addEventListener("click", () => input.classList.toggle("searchHidden"));
  input.addEventListener("input", render);
  input.addEventListener("focus", () => {
    active = true;
    window.addEventListener("click", onOutsideClick);
    loadSearchIndex();
    render();
  });
}

// Photo gallery lightbox.
const CLOSE_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>';

function initGallery(gallery) {
  const items = [...gallery.querySelectorAll("[data-gallery-item]")];
  let overlay = null;
  let index = 0;
  let opener = null; // element to give focus back to on close

  const close = () => {
    overlay?.remove();
    overlay = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    opener?.focus();
  };
  const onKey = (e) => {
    // Keep keyboard focus inside the dialog (as @reach/dialog did).
    if (e.key === "Tab") {
      e.preventDefault();
      overlay?.querySelector("[role=dialog]")?.focus();
    }
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" && index > 0) show(index - 1);
    if (e.key === "ArrowRight" && index < items.length - 1) show(index + 1);
  };

  const show = (i) => {
    index = i;
    const item = items[i].dataset;
    if (!overlay) {
      opener = document.activeElement;
      overlay = document.createElement("div");
      overlay.setAttribute("data-reach-dialog-overlay", "");
      overlay.style.cssText =
        "background:hsla(0, 0%, 0%, 0.84);position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;z-index:1000";
      document.body.append(overlay);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    }
    const img = document.createElement("img");
    img.alt = item.alt;
    img.decoding = "async";
    img.sizes = "(max-width: 400px) 300px, (max-width: 600px) 600px, (max-width: 768px) 700px, 800px";
    img.srcset = item.srcset;
    img.src = item.src;
    img.style.cssText =
      "position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" +
      (item.focus ? `;object-position:${item.focus}` : "");

    overlay.innerHTML = `<div data-reach-dialog-content role="dialog" aria-modal="true" tabindex="-1" style="background:white;margin:5vh auto;max-width:800px;outline:none;padding:0.5rem;width:95vw"><div class="gallery-m__dialog-inner"><div class="gallery__caption"></div><div class="gallery__close-icon">${CLOSE_ICON}</div></div><span class="gallery__left-arrow${i === 0 ? " disabled" : ""}"></span><span class="gallery__right-arrow${i === items.length - 1 ? " disabled" : ""}"></span></div>`;
    const inner = overlay.querySelector(".gallery-m__dialog-inner");
    inner.prepend(img);
    inner.querySelector(".gallery__caption").textContent = item.caption;
    inner.querySelector(".gallery__close-icon svg").addEventListener("click", close);
    if (i > 0) overlay.querySelector(".gallery__left-arrow").addEventListener("click", () => show(i - 1));
    if (i < items.length - 1) overlay.querySelector(".gallery__right-arrow").addEventListener("click", () => show(i + 1));
    overlay.querySelector("[role=dialog]").focus({ preventScroll: true });
  };

  items.forEach((el, i) => {
    el.addEventListener("click", () => show(i));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        show(i);
      }
    });
  });
}

// Click-to-play video thumbnails.
function initVideo(el) {
  el.addEventListener(
    "click",
    () => {
      el.innerHTML = `<iframe src="${el.dataset.videoEmbed}" width="560" height="315" frameborder="0" allowfullscreen title="Video "></iframe>`;
    },
    { once: true }
  );
}

initDrawer();
document.querySelectorAll("[data-search]").forEach(initSearch);
document.querySelectorAll("[data-gallery]").forEach(initGallery);
document.querySelectorAll("[data-video-embed]").forEach(initVideo);
