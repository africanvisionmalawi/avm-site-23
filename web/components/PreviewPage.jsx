import { PageHome } from "components/common/PageHome";
import { usePreview } from "lib/sanity.preview";

export default function PreviewPage({ query }) {
  console.log("query inside orevuew page", query);
  const data = usePreview(null, query);
  console.log("data is ", data);
  return (
    <>
      <PageHome data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
}
