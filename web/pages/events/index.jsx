import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { CardPostAlt } from "components/card/CardPostAlt";
import { Hero } from "components/Hero";
import { siteMeta } from "constants/site";
import dayjs from "dayjs";
import groq from "groq";
import { NextSeo } from "next-seo";
import React from "react";
import client from "/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const TopHeading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
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

const Heading = styled.h2`
  font-size: 2.4em;
  margin: 2rem 0 0;
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

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const EventsHomePage = ({ data }) => {
  // console.log("data here length ", data.length);
  let futureEvents = [];
  let pastEvents = [];
  data.forEach((event) => {
    if (event.endDate) {
      if (
        dayjs(event.endDate, "MMMM DD, YYYY").isAfter(
          dayjs().format("MMMM DD, YYYY")
        )
      ) {
        futureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    } else {
      if (
        dayjs(event.date, "MMMM DD, YYYY").isAfter(
          dayjs().format("MMMM DD, YYYY")
        )
      ) {
        futureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    }
  });
  const title = "Events";
  return (
    <>
      <NextSeo
        title={`${title} |  African Vision Malawi` || siteMeta.title}
        description={
          data?.description ? data?.description : siteMeta.description
        }
      />
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
            {futureEvents.length
              ? futureEvents.map((post) => {
                  // console.log("post here is ", post);
                  return (
                    <React.Fragment key={post.id}>
                      <CardPostAlt
                        type="event"
                        title={post.title}
                        excerpt={post.excerpt}
                        slug={post.slug}
                        publishDate={post.publishDate}
                        date={post.date}
                        endDate={post.endDate}
                        hideTime={post.endDate}
                        allDay={post.allDay}
                        photo={post.featured_image}
                      />
                    </React.Fragment>
                  );
                })
              : null}
          </PostList>
          <Heading>Past events</Heading>
          <PostList>
            {pastEvents.length &&
              pastEvents.map((post) => {
                return (
                  <>
                    <React.Fragment key={post.id}>
                      <CardPostAlt
                        type="event"
                        title={post.title}
                        excerpt={post.excerpt}
                        slug={post.slug}
                        publishDate={post.publishDate}
                        date={post.date}
                        endDate={post.endDate}
                        hideTime={post.endDate}
                        allDay={post.allDay}
                        photo={post.featured_image}
                      />
                    </React.Fragment>
                  </>
                );
              })}
          </PostList>
        </Main>
      </article>
    </>
  );
};

const query = groq`*[_type == "event"] | order(date desc){     
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
}`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"

  const data = await client.fetch(query, {});

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default EventsHomePage;
