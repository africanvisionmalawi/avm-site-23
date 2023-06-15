import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { FooterForm } from "components/footer/FooterForm";
import { siteMeta } from "constants/site";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
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
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial";
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
    z-index: 6;
  }

  & a {
    background: #fff;
    border: 2px solid #b75906;
    border-radius: 12px;
    display: inline-block;
    font-size: 0.8em;
    left: 50%;
    margin-left: -107px;
    padding: 4px 24px;
    position: absolute;
    text-align: center;
    top: 10%;
    width: 160px;
    z-index: 20;
  }
`;

export const PageIndex = ({ data }) => {
  // console.log("data here ", data);
  const { homePage, events, ourWork } = data;
  // console.log("ourwork ", ourWork);
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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
      />
      <article>
        <Main>
          <center>
            <h2>Form test 1</h2>
            <FooterForm />
            <hr />
            <h2>Form test 2</h2>
            <form
              action="https://www.createsend.com/t/subscribeerror?description="
              id="subForm"
              className="js-cm-form"
              name="mailing-list"
              method="post"
              data-id="191722FC90141D02184CB1B62AB3DC26534B73A939144A114A65220640919F92FC6A5ED12F30EFA39EE631C0319C1BF2CBF80D465049B494DC85F6BDBDE44C47"
            >
              <input
                type="text"
                className="js-cm-email-input qa-input-email"
                name="cm-name"
                aria-label="Name"
                id="fieldName"
                placeholder="Name"
                required
              />
              <input
                type="email"
                maxlength="200"
                name="cm-jdhiii-jdhiii"
                aria-label="Email"
                id="fieldEmail"
                placeholder="Email"
                required
              />

              <button className="btn btn-primary" type="submit">
                Join list
              </button>

              <input type="hidden" name="form-name" value="mailing-list" />
            </form>
          </center>
        </Main>
      </article>
    </>
  );
};
