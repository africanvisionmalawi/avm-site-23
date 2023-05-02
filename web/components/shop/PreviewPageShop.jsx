import { PageShop } from "components/shop/PageShop";
import { usePreview } from "lib/sanity.preview";

export const PreviewPageShop = ({ query, queryParams, currentSlug, token }) => {
  const data = usePreview(token, query, queryParams);

  return (
    <>
      <PageShop data={data} currentSlug={currentSlug} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
};
