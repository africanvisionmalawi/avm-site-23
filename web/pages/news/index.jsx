import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { CardPostAlt } from "components/card/CardPostAlt";
import { Hero } from "components/Hero";
import groq from "groq";
import React from "react";
import client from "/client";
const glob = require("glob");

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
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

const LatestNews = styled.div`
  background: #f7f7f7;
  padding: 2.5em 0;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
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

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(1fr, 1fr));
  grid-gap: 3rem;
  grid-auto-flow: dense;
  margin: 2rem auto;
  max-width: 1180px;
  padding: 0 1rem;
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

const NewsHomePage = ({ data }) => {
  // console.log("data here ", data.length);

  return (
    <article>
      {data.hero ? (
        <Hero
          image={data.hero.image}
          mobileImage={data.hero.mobileImage}
          displayHeroMsg={false}
          // heroHeading={c.title}
          // heroHeadingType="h2"
        />
      ) : null}
      <TopSection>
        <Heading>{data.title}</Heading>
      </TopSection>
      <Main>
        <PostList>
          {data.map((post) => {
            return (
              <React.Fragment key={post.id}>
                <CardPostAlt
                  type={post.type}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  publishDate={post.publishDate}
                  photo={post.photo}
                />
              </React.Fragment>
            );
          })}
        </PostList>
      </Main>
    </article>
  );
};

const query = groq`*[_type == "news"] | order(publishDate desc){     
  _id,
    title,
  publishDate,
  slug,
  photo,
  excerpt,
  tag,  
}`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  // let markdownPosts = [];
  const files = glob("posts/**/**/*.md", { absolute: true });
  // console.log("files ", files);
  glob("posts/**/**/*.md", (err, files) => {
    {
      files;
    }
  });
  // console.log("markdownosts ", markdownPosts);
  const data = await client.fetch(query, {});
  //   console.log("data **********", data);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default NewsHomePage;
