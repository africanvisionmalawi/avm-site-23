import { PageEvent } from "components/events/PageEvent";
import { usePreview } from "lib/sanity.preview";

export const PreviewPageEvent = ({ query, queryParams, token }) => {
  const data = usePreview(token, query, queryParams);
  return (
    <>
      <PageEvent data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
};
