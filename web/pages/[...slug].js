import { PageCommon } from "components/page/PageCommon";
import { siteMeta } from "constants/site";
import { getPageByPath, getPageStaticPaths } from "lib/content";
import { NextSeo } from "next-seo";

const Page = ({ data, fullPath }) => {
  return (
    <>
      <NextSeo
        title={
          data?.title
            ? `${data?.title} |  African Vision Malawi`
            : siteMeta.title
        }
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${fullPath}`}
        description={data?.description || siteMeta.description}
      />
      <PageCommon data={data} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: getPageStaticPaths(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = params.slug.join("/");
  const data = getPageByPath(fullPath);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      fullPath,
    },
  };
}

export default Page;
