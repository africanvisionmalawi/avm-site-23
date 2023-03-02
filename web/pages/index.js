import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { CardPost } from "components/card/CardPost";
import { CardPostAlt } from "components/card/CardPostAlt";
import { Hero } from "components/Hero";
import { PortableText } from "components/portable-text/BasePortableText";
import { siteMeta } from "constants/site";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
// import { PortableText } from "lib/sanity";
import { Player } from "components/videos/Player";
import groq from "groq";
import React from "react";
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

const HomePage = ({ data }) => {
  // console.log("data here ", data);
  const { homePage, events } = data;
  // console.log("events ", events);
  const allEvents = events || [];
  // console.log("allEvents ", allEvents);
  let futureEvents = [];
  if (allEvents.length) {
    allEvents.forEach((event) => {
      if (event.endDate) {
        if (
          dayjs(event.endDate, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        }
      } else {
        if (
          dayjs(event.date, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        }
      }
    });
  }

  const latestEvents = [...futureEvents].reverse();
  // console.log("latestEvents ", latestEvents);
  return (
    <>
      <NextSeo
        title="Welcome to African Vision Malaw"
        description={siteMeta.description}
      />
      <article>
        <Hero
          image={homePage.hero.image}
          mobileImage={homePage.hero.mobileImage}
          displayHeroMsg={false}
          // heroHeading={c.title}
          // heroHeadingType="h2"
        />
        <TopSection>
          <Heading>{homePage.title}</Heading>
          {homePage.subTitle ? homePage.subTitle : null}
        </TopSection>
        <Main>
          <TopVideoSection>
            <TopVideoSectionInner>
              <VideoSection>
                {homePage.introText ? (
                  <TextSection>
                    <PortableText
                      key={homePage.introText._key}
                      blocks={homePage.introText}
                    />
                  </TextSection>
                ) : null}
              </VideoSection>
              <VideoSection>
                {homePage.promoVideo ? (
                  <Player url={homePage.promoVideo.url} />
                ) : null}
              </VideoSection>
            </TopVideoSectionInner>
          </TopVideoSection>
          {homePage.latestNews ? (
            <LatestNews>
              <h2>Latest news</h2>
              <PortableText
                key={homePage.latestNews._key}
                blocks={homePage.latestNews}
              />
            </LatestNews>
          ) : null}

          {homePage.newsLinks ? (
            <>
              <section>
                <PostList>
                  <CardCont>
                    {homePage.newsLinks.newsLinks.map((post) => (
                      <React.Fragment key={post._id}>
                        <CardPost post={post} />
                      </React.Fragment>
                    ))}
                  </CardCont>
                </PostList>
              </section>
              <PostsFooter>
                <a href="/news/">View all news</a>
              </PostsFooter>
            </>
          ) : null}

          {latestEvents ? (
            <>
              <section>
                <PostList>
                  <CardCont>
                    {latestEvents.map((post) => (
                      <React.Fragment key={post.id}>
                        <CardPostAlt
                          type="event"
                          title={post.title}
                          excerpt={post.excerpt}
                          slug={post.slug}
                          date={post.date}
                          endDate={post.endDate}
                          hideTime={post.hideTime}
                          allDay={post.allDay}
                          photo={post.featured_image}
                        />
                      </React.Fragment>
                    ))}
                  </CardCont>
                </PostList>
              </section>
              <PostsFooter>
                <a href="/events/">View all events</a>
              </PostsFooter>
            </>
          ) : null}
        </Main>
      </article>
    </>
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
}
}
`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"

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
