// import SanityImage from "gatsby-plugin-sanity-image";
import styled from "@emotion/styled";
import { Donate } from "components/common/Donate";
import { OurWork } from "components/ourwork";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql, Link } from "gatsby";
import React from "react";
import { CardPost } from "../../components/card/CardPost";
import { CardPostAlt } from "../../components/card/CardPostAlt";
import { Hero } from "../../components/Hero";
// import InfoRows from "../components/InfoRows";
// import { Hero } from "../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import { PortableText } from "../../components/portable-text/BasePortableText";
import { Player } from "../../components/videos/Player";
import Layout from "../components/Layout";
// import videoStyles from "../components/videos/videos.module.css";
dayjs.extend(advancedFormat);
// export const query = graphql`

export const lgRectImage = graphql`
  fragment photoTileFixedLgRect on File {
    childImageSharp {
      fluid(maxWidth: 980, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

export const mdRectImage = graphql`
  fragment photoTileFixedMdRect on File {
    childImageSharp {
      fluid(maxWidth: 480, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

const HomePage = ({ data }) => {
  const page = data.homeQuery;
  // console.log("newsLinks ", page.newsLinks);

  const allEvents = data.homeEventsAll.edges;
  const ourWork = data.ourWork.edges;

  let futureEvents = [];
  if (allEvents.length) {
    allEvents.forEach(({ node: event }) => {
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

  return (
    <Layout
      title={page.title ? page.title : ""}
      description={page.description ? page.description : ""}
      article={false}
    >
      <article>
        {page.hero ? (
          <Hero
            fluid={page.hero.image.asset.fluid}
            displayHeroMsg={true}
            heroHeading={page.title}
            heroHeadingType="h1"
            heroSubHeading={page.subTitle}
          />
        ) : (
          <TopSection>
            <Heading>{page.title}</Heading>
            {page.subTitle ? page.subTitle : null}
          </TopSection>
        )}
        <Main>
          <TopVideoSection>
            <TopVideoSectionInner>
              <VideoSection>
                {page.introText ? (
                  <TextSection>
                    <PortableText
                      key={page.introText._key}
                      blocks={page._rawIntroText}
                    />
                  </TextSection>
                ) : null}
              </VideoSection>
              <VideoSection>
                {page.promoVideo ? <Player url={page.promoVideo.url} /> : null}
              </VideoSection>
            </TopVideoSectionInner>
          </TopVideoSection>

          <Donate
            link="https://www.charitycheckout.co.uk/1113786/"
            text="Donate"
            displayImage
          />

          {ourWork ? (
            <Container>
              <OurWork displayHeading ourWork={ourWork[0].node.ourWork} />
            </Container>
          ) : null}

          {page.latestNews ? (
            <LatestNews>
              <h2>Latest news</h2>
              <PortableText
                key={page.latestNews._key}
                blocks={page._rawLatestNews}
              />
            </LatestNews>
          ) : null}

          {page.newsLinks ? (
            <>
              <section>
                <PostList>
                  <CardCont>
                    {page.newsLinks.newsLinks.map((post) => (
                      <React.Fragment key={post.url.id}>
                        <CardPost post={post.url} />
                      </React.Fragment>
                    ))}
                  </CardCont>
                </PostList>
              </section>
              <PostsFooter>
                <Link to="/news/">View all news</Link>
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
                          excerpt={post._rawExcerpt}
                          slug={post.slug.current}
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
                <Link to="/events/">View all events</Link>
              </PostsFooter>
            </>
          ) : null}
        </Main>
      </article>
    </Layout>
  );
};

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

export default HomePage;
