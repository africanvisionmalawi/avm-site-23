export default function resolveProductionUrl(document) {
  const pathPrefix =
    document.category.slug.current === "other"
      ? "/"
      : document.category.slug.current + "/";
  const path = `${pathPrefix}${
    document.indexPage ? "" : document.slug.current + "/"
  }`;
  return `https://preview-avmsite21.gtsb.io/${path}`;
}
