import { PageCommon } from "components/page/PageCommon";
import { usePreview } from "lib/sanity.preview";

export const PreviewPageCommon = ({ query, queryParams, token }) => {
  const data = usePreview(token, query, queryParams);
  return (
    <>
      <PageCommon data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
};
