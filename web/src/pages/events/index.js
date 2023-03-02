import styled from "@emotion/styled";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql } from "gatsby";
import React from "react";
import { CardPostAlt } from "../../../components/card/CardPostAlt";
import { SectionTop } from "../../../components/common/SectionTop";
import Errors from "../../components/errors";
import Layout from "../../components/Layout";
dayjs.extend(advancedFormat);

export const query = graphql`
  query EventsTemplateQuery {
    shopAll: allSanityEvent(
      filter: { slug: { current: { ne: null } } }
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          _rawExcerpt(resolveReferences: { maxDepth: 10 })
          _rawBody(resolveReferences: { maxDepth: 10 })
          telephone
          location
          url
          cost
          date
          endDate
          allDay
          hideTime
          contact
          meta_description
          featured_image {
            _key
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;

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

const EventsIndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  if (!data) {
    return "Error! data not found";
  }

  const allEvents = data.shopAll.edges;

  let futureEvents = [];
  let pastEvents = [];
  allEvents.forEach(({ node: event }) => {
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

  // console.log("pastEvents ", pastEvents);

  const title = "Latest events - African Vision Malawi";
  const description = "Latest events from African Vision Malawi.";

  const latestEvents = [...futureEvents].reverse();

  return allEvents.length ? (
    <>
      <Layout title={title} description={description} article={false}>
        <article>
          <SectionTop>
            <TopHeading>{title}</TopHeading>
          </SectionTop>
          <PostList>
            {latestEvents.length &&
              latestEvents.map((post) => {
                return (
                  <>
                    <React.Fragment key={post.id}>
                      <CardPostAlt
                        type="event"
                        title={post.title}
                        excerpt={post._rawExcerpt}
                        slug={post.slug.current}
                        date={post.date}
                        endDate={post.endDate}
                        hideTime={post.hideTime}
                        allDay={post.allDay}
                        photo={post.featured_image}
                        displayMoreButton
                      />
                    </React.Fragment>
                  </>
                );
              })}
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
                        excerpt={post._rawExcerpt}
                        slug={post.slug.current}
                        date={post.date}
                        endDate={post.endDate}
                        hideTime={post.hideTime}
                        allDay={post.allDay}
                      />
                    </React.Fragment>
                  </>
                );
              })}
          </PostList>
        </article>
      </Layout>
    </>
  ) : null;
};

export default EventsIndexPage;
