import { PageIndex } from "components/homepage/PageIndex";
import { usePreview } from "lib/sanity.preview";

export default function PreviewPageIndex({ query, token }) {
  // console.log("query inside orevuew page", query);
  // console.log("token inside preview page ", token);
  const data = usePreview(token, query);
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
