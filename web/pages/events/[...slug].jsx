import styled from "@emotion/styled";
import { PageEvent } from "components/events/PageEvent";
import { PreviewPageEvent } from "components/events/PreviewPageEvent";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import client from "/client";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const TopSection = styled.div`
  margin: 0 auto;
  max-width: 885px;
  padding: 3rem 1rem 0;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding-top: 1rem;
  }
`;

const TextSection = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2rem 4em;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em;
  }
`;

const ContentSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Page = ({ data, slug, preview }) => {
  // console.log("data here is ***** ", data);

  return (
    <>
      {preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewPageEvent query={query} queryParams={queryParams} />
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

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  // console.log("slug length ", slug.length);
  const hasCategory = !!slug.length > 1;
  // console.log("hasCategory ", hasCategory);
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
