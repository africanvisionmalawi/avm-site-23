import { PageEvent } from "components/events/PageEvent";
import { PreviewPageEvent } from "components/events/PreviewPageEvent";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import client from "/client";

const Page = ({ data, slug, preview, queryParams, token }) => {
  // console.log("data here is ***** ", data);

  return (
    <>
      {preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewPageEvent
            query={query}
            queryParams={queryParams}
            token={token}
          />
        </PreviewSuspense>
      ) : (
        <PageEvent data={data} slug={slug} />
      )}
    </>
  );
};

const query = groq`*[_type == "event" && slug.current == $slug[0]][0]{ 
 _id,
title,
  publishDate,
  slug,
  photo,
  excerpt,
  body[] {
    ...,
    asset->
  },
  date,
  endDate,
  allDay,
  hideTime,
  featured_image,
  noHero,
  tag, 
  location,
  contact,
  telephone,
  cost,  
}`;

export async function getStaticPaths() {
  const allPages = await client.fetch(
    ` *[_type == "event" && slug.current != null] {
      'slug': slug.current,      
    }`
  );
  return {
    paths:
      allPages?.map((page) => ({
        params: {
          slug: [page.slug],
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  // console.log("slug length ", slug.length);
  const hasCategory = !!slug.length > 1;
  // console.log("hasCategory ", hasCategory);

  const queryParams = { slug };

  if (preview && previewData?.token) {
    return {
      props: { preview, queryParams, token: previewData.token },
    };
  }

  const data = await client.fetch(query, { slug, hasCategory });
  // console.log("slug ", slug);
  // console.log("hero ", data.content);
  // console.log("data ", data);
  return {
    props: {
      data,
      preview,
      slug,
    },
  };
}

export default Page;
