import styled from "@emotion/styled";
// import { Image } from "components/common/image/Image";
import { Hero } from "components/Hero";
import { EventSummary } from "components/events/EventSummary";
import { Gallery } from "components/gallery";
import { PageLinks } from "components/page-links";
import { PortableText } from "components/portable-text/BasePortableText";
import { Videos } from "components/videos";
import { siteMeta } from "constants/site";
import { NextSeo } from "next-seo";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
`;

const TextSection = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2rem 4em;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em;
  }
`;

const ContentSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

const EventDetails = styled.ul`
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 16px;
  &,
  & li {
    list-style-type: none;
  }
`;

export const PageEvent = ({ data, slug }) => {
  // console.log("data here is ***** ", data);

  if (!data) {
    // console.log("error ******");
    return;
  }
  const content = (data?.content || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      // console.log("type ", c._type);
      switch (c._type) {
        case "hero":
          el = (
            <Hero
              image={c.image}
              displayHeroMsg={false}
              heroHeading={c.title}
              heroHeadingType="h2"
            />
          );
          // console.log("c.image.asset **********", c.image.asset);
          break;
        case "videoGallery":
          el = <Videos key={c._key} {...c} />;
          break;
        case "pageLinks":
          // console.log("pageLinks c ", c);
          el = (
            <ContentSection>
              <PageLinks key={c._key} {...c} />
            </ContentSection>
          );
          break;
        case "photoGallery":
          el = <Gallery key={c._key} {...c} />;
          break;
        case "blockPortableText":
          el = (
            <TextSection>
              <PortableText key={c._key} {...c} />
            </TextSection>
          );
          break;
        case "team":
          el = (
            <TextSection>
              <TeamList key={c._key} {...c} />
            </TextSection>
          );
          break;
        case "googlemap":
          // console.log("has map");
          el = <GoogleMap key={c._key} {...c} />;
          break;
        case "uiComponentRef":
          switch (c.name) {
            case "topWave":
              //   el = <TopWave />;
              break;
            case "bottomWave":
              //   el = <BottomWave />;
              break;
            default:
              break;
          }
          break;
        default:
          el = null;
      }
      return el;
    });
  return (
    <>
      <NextSeo
        title={
          data?.title
            ? `${data?.title} |  African Vision Malawi`
            : siteMeta.title
        }
        description={data?.description || siteMeta.description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/events/${data?.slug?.current}/`}
      />

      <article>
        <section className="articleInner">
          <h1>{data?.title}</h1>
        </section>
        {data?.featured_image && (
          <>
            <Hero
              image={data.featured_image}
              displayHeroMsg={false}
              // heroHeading={c.title}
              // heroHeadingType="h2"
            />
            {/* <Image image={data.hero.image.asset} /> */}
          </>
        )}

        {data.date ? (
          <section className="articleInner">
            <EventSummary data={data} />
          </section>
        ) : null}
        <section className="articleInner">
          {data?.body ? <PortableText article blocks={data.body} /> : null}
        </section>
        <section className="articleInner">
          <Container>{content}</Container>
          {/* {data?.photo ? (
            <Image
              image={data.photo}
              maxWidth={800}
              height={540}
              alt={data.photo.alt}
            />
          ) : null} */}
        </section>
      </article>
    </>
  );
};
