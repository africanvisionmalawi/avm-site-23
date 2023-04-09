import { PageIndex } from "components/homepage/PageIndex";
import { usePreview } from "lib/sanity.preview";

export default function PreviewPageIndex({ query }) {
  // console.log("query inside orevuew page", query);
  const data = usePreview(null, query);
  // console.log("data is ", data);
  return (
    <>
      <PageIndex data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
}
