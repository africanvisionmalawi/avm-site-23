import { usePreview } from "lib/sanity.preview";
// import Movies from "./Movies";

export default function PreviewPage({ query }) {
  const data = usePreview(null, query);

  return (
    <>
      {/* <Movies movies={data} /> */}
      <a href="/api/exit-preview">Exit Preview</a>
    </>
  );
}
