import { PageCommon } from "components/common/PageCommon";
import { usePreview } from "lib/sanity.preview";

export const PreviewPageCommon = ({ query }) => {
  const data = usePreview(null, query);
  return (
    <>
      <PageCommon data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
};
