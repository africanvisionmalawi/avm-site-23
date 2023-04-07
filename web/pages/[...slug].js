import { PageCommon } from "components/common/PageCommon";
import { PreviewPageCommon } from "components/PreviewPageCommon";
import { siteMeta } from "constants/site";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import { NextSeo } from "next-seo";
import client from "/client";

const Page = ({ preview, data, queryParams, fullPath }) => {
  // console.log("content here is ***************** ", data?.content);
  // console.log("data here is ***************** ", data);
  // console.log("hero ", data.hero);
  // console.log("bannermsg ", data?.bannerMsg);
  return (
    <>
      <NextSeo
        title={
          data?.title
            ? `${data?.title} |  African Vision Malawi`
            : siteMeta.title
        }
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${fullPath}/`}
        description={data?.description || siteMeta.description}
      />
      {preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewPageCommon
            query={query}
            queryParams={queryParams}
            fullPath={fullPath}
          />
        </PreviewSuspense>
      ) : (
        <PageCommon data={data} />
      )}
    </>
  );
};

export async function getStaticPaths() {
  const allPages = await client.fetch(
    ` *[_type == "page" && slug.current != null] {
      'slug': slug.current,
      'category': category->slug.current,
      'indexPage': indexPage,
    }`
  );
  return {
    paths:
      allPages?.map((page) => ({
        params: {
          slug: [page.indexPage ? page.slug : `${page.category}/${page.slug}`],
        },
      })) || [],
    fallback: false,
  };
}

const query = groq`*[_type == "page" && slug.current == $slug][0]{ 
  slug, 
  id,
  title,
  description,
  indexPage,
  pageHeading, 
  "categoryTitle": category->title, 
  "categorySlug": category->slug.current,
  hero, 
  bannerMsg,  
  content[] {  
    ...,          
    pageLinks[] {
      ...,     
      url-> {
        category->,
        slug,
      },
    },         
  },  
  body,
}`;

export async function getStaticProps({ params, preview = false }) {
  // if (preview) {
  //   console.log("hasPreview");
  //   return { props: { preview } };
  // }

  const fullPath = params.slug.join("/");

  // console.log("PREVIEW ", preview);
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  // console.log("slug ", slug);
  const hasCategory = slug.length > 1;
  const currentSlug = hasCategory ? slug[slug.length - 1] : slug[0];
  // console.log("currentSlug ", currentSlug);

  const queryParams = { slug: currentSlug };
  // console.log("queryparams inside page ", queryParams.slug);
  if (preview) {
    return { props: { preview, queryParams, fullPath } };
  }

  const data = await client.fetch(query, { slug: currentSlug });
  // console.log("data ", data);
  return {
    props: {
      data,
      preview,
      fullPath,
    },
    revalidate: 10,
  };
}

export default Page;
