import imageUrlBuilder from "@sanity/image-url";
import { Hero } from "components/Hero";
import { CardPost } from "components/card/CardPost";
import { CardPostAlt } from "components/card/CardPostAlt";
import { Donate } from "components/common/Donate";
import { OurWork } from "components/ourwork/ourwork";
import { PortableText } from "components/portable-text/BasePortableText";
import { Player } from "components/videos/Player";
import { siteMeta } from "constants/site";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import React from "react";
import styles from "./pageindex.module.css";
import client from "/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}`}
      />
      <article>
        <Hero
          image={homePage.hero.image}
          mobileImage={homePage.hero.mobileImage}
          displayHeroMsg={false}
          // heroHeading={c.title}
          // heroHeadingType="h2"
        />
        <div className={`${styles.topSection} articleInner`}>
          <h1 className={styles.heading}>{homePage.title}</h1>
          {homePage.subTitle ? homePage.subTitle : null}
        </div>

        <main className={styles.main}>
          <div className="articleInner">
            <div className={styles.topVideoSection}>
              <div className={styles.topVideoSectionInner}>
                <div className={styles.videoSection}>
                  {homePage.introText ? (
                    <section className={styles.textSection}>
                      <PortableText
                        key={homePage.introText._key}
                        blocks={homePage.introText}
                      />
                    </section>
                  ) : null}
                </div>
                <div className={styles.videoSection}>
                  {homePage.promoVideo ? (
                    <Player url={homePage.promoVideo.url} />
                  ) : null}
                </div>
              </div>
            </div>
            {ourWork ? (
              <div className={styles.container}>
                <OurWork ourWork={ourWork.ourWork} displayHeading />
              </div>
            ) : null}
          </div>
          <div className="articleInner">
            <Donate />
          </div>

          {homePage.latestNews ? (
            <div className={styles.latestNews}>
              <div className={styles.latestNewsInner}>
                <h2>Latest news</h2>
                <PortableText
                  key={homePage.latestNews._key}
                  blocks={homePage.latestNews}
                />
              </div>
            </div>
          ) : null}
          <div className="articleInner">
            {homePage.newsLinks ? (
              <>
                <section>
                  <div className={styles.postList}>
                    <div className={styles.cardCont}>
                      {homePage.newsLinks.newsLinks.map((post) => (
                        <React.Fragment key={post._id}>
                          <CardPost post={post} />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </section>
                <div className={styles.postsFooter}>
                  <a href="/news">View all news</a>
                </div>
              </>
            ) : null}

            {latestEvents ? (
              <>
                <section>
                  <div className={styles.postList}>
                    <div className={styles.cardCont}>
                      {latestEvents.map((post) => (
                        <React.Fragment key={post._id}>
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
                    </div>
                  </div>
                </section>
                <div className={styles.postsFooter}>
                  <a href="/events">View all events</a>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </article>
    </>
  );
};
