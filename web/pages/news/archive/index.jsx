import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { siteMeta } from "constants/site";
import { format, parseISO } from "date-fns";
import fs, { readdirSync } from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import { join } from "path";
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
  //   console.log("data here ", data);

  return (
    <>
      <NextSeo
        title={
          data?.title
            ? `${data?.title} |  African Vision Malawi`
            : siteMeta.title
        }
        description={data?.description || siteMeta.description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/news/`}
      />
      <article>
        <TopSection>
          <Heading>News Archive</Heading>
        </TopSection>
        <Main>
          <ul>
            {data.map((post) => {
              return (
                <li key={post.frontmatter.path}>
                  <a href={`/news/archive/${post.frontmatter.path}`}>
                    {post.frontmatter.title}, <em>{post.frontmatter.date}</em>
                  </a>
                </li>
              );
            })}
          </ul>
        </Main>
      </article>
    </>
  );
};

export async function getStaticProps(context) {
  //   const fs} = require("fs/promises"); // LOOK HERE

  const getFileList = (dirName) => {
    let files = [];
    const items = readdirSync(dirName);

    for (const item of items) {
      if (fs.statSync(dirName + "/" + item).isDirectory()) {
        files = [...files, ...getFileList(`${dirName}/${item}`)];
      } else {
        files.push(`${dirName}/${item}`);
      }
    }

    return files;
  };

  const slugs = getFileList("newsposts");
  console.log("slugs ", slugs);

  const data = slugs
    .map((slug) => {
      let dirPath = join("newsposts", slug);
      const fileContents = fs.readFileSync(slug, "utf8");
      const { data, content } = matter(fileContents);
      const date = format(parseISO(data.date), "MMMM dd, yyyy");
      return {
        slug,
        frontmatter: { ...data, date },
        content,
      };
    })
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
        ? -1
        : 1
    );

  return {
    props: {
      data,
    },
  };
}

export default NewsHomePage;
