import { PageEvent } from "components/common/PageEvent";
import { usePreview } from "lib/sanity.preview";

export const PreviewPageEvent = ({ query, queryParams }) => {
  const data = usePreview(null, query, queryParams);
  return (
    <>
      <PageEvent data={data} slug={sluglug} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
};
