import { PageHome } from "components/common/PageHome";
import { usePreview } from "lib/sanity.preview";

export default function PreviewPage({ query }) {
  const data = usePreview(null, query);

  return (
    <>
      <PageHome data={data} />
      <a className="previewButton" href="/api/exit-preview">
        Exit Preview
      </a>
    </>
  );
}
