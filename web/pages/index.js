import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { PageHome } from "components/common/PageHome";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import React, { lazy } from "react";
import client from "/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 3em 0;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const TopSection = styled.div`
font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
  margin: 0 auto;
  max-width: 885px;
  padding: 3rem 1rem 0;
  position: relative;
  text-align: center;
  @media (min-width: 768px) {
    padding-top: 1rem;
  }
`;

const TextSection = styled.section`
  background: #fff;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
`;

const LatestNews = styled.div`
  background: #f7f7f7;
  min-height: 24rem;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem 4em 2rem;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em 2rem;
  }
  h2 {
    text-align: center;
  }
`;
const LatestNewsInner = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  position: relative;
`;

const PostList = styled.div`
  display: flex;
  margin: 2rem auto;
  max-width: 1180px;
`;

const CardCont = styled.div`
  align-items: grid-start;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 30px;
  flex-shrink: 2;
  justify-content: center;
  max-width: 1525px;
  width: 100%;
  @media (min-width: 414px) {
    grid-template-columns: repeat(auto-fill, 373px);
  }
`;

const VideoSection = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const TopVideoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto 1rem;
  text-align: center;
  @media (min-width: 778px) {
    text-align: left;
  }
`;

const TopVideoSectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1280px;
  padding: 3em 1em 1em;
  width: 100%;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const PostsFooter = styled.div`
  height: 50px;
  margin: 0 auto 3rem;
  max-width: 1180px;
  position: relative;
  &::before {
    bottom: 50%;
    content: "";
    border-bottom: 1px solid #b75906;
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  & a {
    background: #fff;
    border: 2px solid #b75906;
    border-radius: 12px;
    display: inline-block;
    font-size: 0.8em;
    left: 50%;
    margin-left: -80px;
    padding: 4px 24px;
    position: absolute;
    text-align: center;
    top: 10%;
    width: 160px;
    z-index: 20;
  }
`;

const PreviewPage = lazy(() => import("components/PreviewPage"));

const HomePage = ({ preview, data }) => {
  // console.log("data here ", data);

  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPage query={query} />
    </PreviewSuspense>
  ) : (
    <PageHome data={data} />
  );
};

const query = groq`{
  'homePage':*[_type == "homePage"][0]  
{     
  title,
  subTitle,
  description,
  hero,  
  introText,
  promoVideo,
  latestNews,
  newsLinks {    
    _type,
    newsLinks[] {
      ...
      url->
    }
  },  
},
'events':*[_type == "event"]
{
  title,
  excerpt,
  slug,
  featured_image,
  date,
  endDate,
  hideTime,
  allDay,
},

'ourWork':*[_type == "ourWorkShared"][0]
{  
  ourWork,
},
}
`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  console.log("preview homepage ", preview);
  const data = await client.fetch(query, {});
  // console.log("events **********", data);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default HomePage;
