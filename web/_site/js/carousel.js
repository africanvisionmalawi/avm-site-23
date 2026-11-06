// Vanilla replacement for the react-slick (0.29) slider used by components/common/Carousel.js.
// Props it was given: autoplay (autoplaySpeed 3000, pauseOnHover), arrows, infinite=false
// (allSizesImages.length is undefined on the photoGallery object), slidesToShow/Scroll 1,
// speed 500, cssEase "ease", waitForAnimate. No dots: dots="true" is a string and
// react-slick only renders dots for === true. The server markup in shop.njk is react-slick's
// SSR output; this script does what react-slick does after hydration (same inline styles,
// classes and aria attributes, same timers).
(function () {
  var SPEED = 500;
  var AUTOPLAY_INTERVAL = 3000 + 50; // react-slick: setInterval(play, autoplaySpeed + 50)
  var TOUCH_THRESHOLD = 5;
  var EDGE_FRICTION = 0.35;

  function init(root) {
    var list = root.querySelector(".slick-list");
    var track = root.querySelector(".slick-track");
    var slides = [].slice.call(track.children);
    var prev = root.querySelector(".slick-prev");
    var next = root.querySelector(".slick-next");
    var count = slides.length;

    var s = {
      currentSlide: 0,
      targetSlide: 0,
      animating: false,
      autoplaying: null,
      listWidth: 0,
      slideWidth: 0,
      dragging: false,
      touch: null,
      swiping: false,
      scrolling: false,
    };
    var animationEndCallback = null;
    var autoplayTimer = null;
    var resizeTimer = null;
    var clickable = true;

    // --- rendering -----------------------------------------------------------
    function trackLeft(i) {
      return -i * s.slideWidth;
    }
    function setTrack(left, animate) {
      track.style.cssText =
        "width: " + s.slideWidth * count + "px; opacity: 1; transform: translate3d(" + left + "px, 0px, 0px);" +
        (animate ? " transition: -webkit-transform " + SPEED + "ms ease;" : "");
    }
    function canGoNext() {
      return !(count <= 1 || s.currentSlide >= count - 1);
    }
    function renderSlides() {
      slides.forEach(function (el, i) {
        var active = i === s.currentSlide;
        el.className = "slick-slide" + (active ? " slick-active slick-current" : "");
        el.setAttribute("aria-hidden", active ? "false" : "true");
        el.style.cssText = "outline: none; width: " + s.slideWidth + "px;";
      });
      prev.className = "slick-arrow slick-prev" + (s.currentSlide === 0 ? " slick-disabled" : "");
      next.className = "slick-arrow slick-next" + (canGoNext() ? "" : " slick-disabled");
    }
    function updateState(setTrackStyle) {
      s.listWidth = Math.ceil(list.getBoundingClientRect().width);
      s.slideWidth = s.listWidth; // slidesToShow = 1
      renderSlides();
      if (setTrackStyle) setTrack(trackLeft(s.currentSlide), false);
    }

    // --- sliding ---------------------------------------------------------------
    function slideHandler(index) {
      if (s.animating) return; // waitForAnimate
      var targetSlide = Math.max(0, Math.min(index, count - 1));
      var animationSlide = index;
      var finalSlide = index;
      if (animationSlide < 0) finalSlide = 0;
      else if (!canGoNext() && animationSlide > s.currentSlide) animationSlide = finalSlide = s.currentSlide;
      else if (animationSlide >= count) finalSlide = count - 1;
      if (animationSlide + 1 >= count) finalSlide = count - 1;
      s.animating = true;
      s.currentSlide = finalSlide;
      s.targetSlide = targetSlide;
      renderSlides();
      setTrack(trackLeft(finalSlide), true);
      animationEndCallback = setTimeout(function () {
        animationEndCallback = null;
        setTrack(trackLeft(finalSlide), false);
        setTimeout(function () {
          s.animating = false;
        }, 10);
      }, SPEED);
    }
    function changeSlide(message) {
      // non-infinite: previous/next move from targetSlide
      slideHandler(s.targetSlide + (message === "next" ? 1 : -1));
      autoPlay("update");
    }

    // --- autoplay ----------------------------------------------------------------
    function play() {
      if (canGoNext()) slideHandler(s.currentSlide + 1);
    }
    function autoPlay(type) {
      if (autoplayTimer) clearInterval(autoplayTimer);
      var a = s.autoplaying;
      if (type === "update" && (a === "hovered" || a === "focused" || a === "paused")) return;
      if (type === "leave" && (a === "paused" || a === "focused")) return;
      autoplayTimer = setInterval(play, AUTOPLAY_INTERVAL);
      s.autoplaying = "playing";
    }
    function pauseHovered() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
      if (s.autoplaying === "playing") s.autoplaying = "hovered";
    }
    // pauseOnHover: react-slick puts these on the track
    track.addEventListener("mouseenter", pauseHovered);
    track.addEventListener("mouseover", pauseHovered);
    track.addEventListener("mouseleave", function () {
      if (s.autoplaying === "hovered") autoPlay("leave");
    });

    // --- arrows / keyboard ---------------------------------------------------------
    prev.addEventListener("click", function () {
      if (s.currentSlide !== 0) changeSlide("previous");
    });
    next.addEventListener("click", function () {
      if (canGoNext()) changeSlide("next");
    });
    list.addEventListener("keydown", function (e) {
      if (/TEXTAREA|INPUT|SELECT/.test(e.target.tagName)) return;
      if (e.keyCode === 37) changeSlide("previous");
      else if (e.keyCode === 39) changeSlide("next");
    });

    // --- swipe / drag ------------------------------------------------------------------
    function swipeDirection(t) {
      var angle = Math.round((Math.atan2(t.startY - t.curY, t.startX - t.curX) * 180) / Math.PI);
      if (angle < 0) angle = 360 - Math.abs(angle);
      if ((angle <= 45 && angle >= 0) || (angle <= 360 && angle >= 315)) return "left";
      if (angle >= 135 && angle <= 225) return "right";
      return "vertical";
    }
    function swipeStart(e) {
      if (e.target.tagName === "IMG" && e.cancelable) e.preventDefault();
      var p = e.touches ? e.touches[0] : null;
      s.dragging = true;
      s.touch = {
        startX: p ? p.pageX : e.clientX,
        startY: p ? p.pageY : e.clientY,
        curX: p ? p.pageX : e.clientX,
        curY: p ? p.pageY : e.clientY,
      };
    }
    function swipeMove(e) {
      if (!s.dragging || s.scrolling) return;
      if (s.animating) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      var t = s.touch;
      var p = e.touches ? e.touches[0] : null;
      t.curX = p ? p.pageX : e.clientX;
      t.curY = p ? p.pageY : e.clientY;
      t.swipeLength = Math.round(Math.abs(t.curX - t.startX));
      var vertical = Math.round(Math.abs(t.curY - t.startY));
      if (!s.swiping && vertical > 10) {
        s.scrolling = true;
        return;
      }
      var offset = t.curX > t.startX ? 1 : -1;
      var dir = swipeDirection(t);
      var length = t.swipeLength;
      if (
        (s.currentSlide === 0 && dir === "right") ||
        (s.currentSlide + 1 >= count && dir === "left") ||
        (!canGoNext() && dir === "left")
      )
        length = length * EDGE_FRICTION;
      setTrack(trackLeft(s.currentSlide) + length * offset, false);
      if (Math.abs(t.curX - t.startX) < Math.abs(t.curY - t.startY) * 0.8) return;
      if (t.swipeLength > 10) {
        s.swiping = true;
        clickable = false;
        if (e.cancelable) e.preventDefault();
      }
    }
    function swipeEnd(e) {
      if (!s.dragging) return;
      var t = s.touch;
      var scrolling = s.scrolling;
      s.dragging = false;
      s.scrolling = false;
      s.swiping = false;
      s.touch = null;
      if (scrolling || !t.swipeLength) return;
      if (t.swipeLength > s.listWidth / TOUCH_THRESHOLD) {
        if (e.cancelable) e.preventDefault();
        var dir = swipeDirection(t);
        var active = s.targetSlide; // non-infinite
        slideHandler(dir === "left" ? active + 1 : dir === "right" ? active - 1 : active);
      } else {
        // back to where it was, animated (react-slick leaves this transition in place)
        setTrack(trackLeft(s.currentSlide), true);
      }
    }
    list.addEventListener("mousedown", swipeStart);
    list.addEventListener("mousemove", swipeMove);
    list.addEventListener("mouseup", swipeEnd);
    list.addEventListener("mouseleave", function (e) {
      if (s.dragging) swipeEnd(e);
    });
    list.addEventListener("touchstart", swipeStart, { passive: true });
    list.addEventListener("touchmove", swipeMove, { passive: true });
    list.addEventListener("touchend", function (e) {
      swipeEnd(e);
      clickable = true;
    });
    list.addEventListener("touchcancel", function (e) {
      if (s.dragging) swipeEnd(e);
    });
    list.addEventListener("click", function (e) {
      if (!clickable) {
        e.stopPropagation();
        e.preventDefault();
      }
      clickable = true;
    });

    // --- resize: react-slick observes the list (any size change, e.g. images loading) ----------
    function resizeWindow(setTrackStyle) {
      updateState(setTrackStyle !== false);
      autoPlay("update");
      s.animating = false;
      clearTimeout(animationEndCallback);
      animationEndCallback = null;
    }
    function onWindowResized(setTrackStyle) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resizeWindow(setTrackStyle);
      }, 50);
    }
    new ResizeObserver(function () {
      if (s.animating) {
        onWindowResized(false);
        setTimeout(onWindowResized, SPEED);
      } else onWindowResized();
    }).observe(list);

    // checkImagesLoad: clicking an image focuses its wrapper (so arrow keys then work), and
    // once every image has loaded the slider re-measures.
    var images = list.querySelectorAll(".slick-slide img");
    var loaded = 0;
    [].forEach.call(images, function (img) {
      img.addEventListener("click", function () {
        img.parentNode.focus();
      });
      function done() {
        if (++loaded >= images.length) onWindowResized();
      }
      // Images already loaded (e.g. from cache) count straight away.
      if (img.complete) loaded++;
      else {
        img.addEventListener("load", done);
        img.addEventListener("error", done);
      }
    });

    // componentDidMount
    updateState(true);
    autoPlay("update");
  }

  function boot() {
    [].forEach.call(document.querySelectorAll(".slick-slider"), init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
