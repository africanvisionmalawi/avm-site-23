import styled from "@emotion/styled";
import { CardPostAlt } from "components/card/CardPostAlt";
import { siteMeta } from "constants/site";
import dayjs from "dayjs";
import { getAllEvents } from "lib/content";
import { NextSeo } from "next-seo";
import React from "react";

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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/events`}
      />
      <article>
        <TopSection>
          <Heading>{title}</Heading>
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

export async function getStaticProps() {
  const data = getAllEvents();

  return {
    props: {
      data,
    },
  };
}

export default EventsHomePage;
