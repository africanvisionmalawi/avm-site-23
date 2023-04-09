import styled from "@emotion/styled";
import { Breadcrumbs } from "components/Breadcrumbs";
import { BannerMsg } from "components/common/BannerMsg";
import { Gallery } from "components/gallery";
import { GoogleMap } from "components/GoogleMap";
import { Hero } from "components/Hero";
import { PageLinks } from "components/page-links";
import { PortableText } from "components/portable-text/BasePortableText";
import { TeamList } from "components/team";
import { Videos } from "components/videos";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const TopSection = styled.div`
  padding: 0 1rem;
  @media (min-width: 768px) {
    padding: 0 5rem;
  }
`;

const TextSection = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
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

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

export const PageCommon = ({ data }) => {
  // console.log("content here is ***************** ", data?.content);
  // console.log("data here is ***************** ", data);
  // console.log("hero ", data.hero);
  // console.log("bannermsg ", data?.bannerMsg);
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
          el = (
            <div className="videosWrapper">
              <div className="articleInner">
                <Videos key={c._key} {...c} />
              </div>
            </div>
          );
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
  const path = [
    {
      title: data?.categoryTitle ? data.categoryTitle : null,
      slug: data?.categorySlug ? data.categorySlug : null,
    },
    {
      title: data?.title,
      slug: data?.slug,
    },
  ];

  return (
    <>
      {path ? <Breadcrumbs path={path} indexPage={data?.indexPage} /> : null}
      <article>
        <TopSection className="articleInner">
          <h1>{data?.title}</h1>
        </TopSection>
        {data?.hero && (
          <Hero
            image={data.hero.image}
            mobileImage={data.hero.mobileImage}
            displayHeroMsg={false}
            heroHeading={data.title}
            // heroHeadingType="h2"
          />
        )}
        {data?.bannerMsg ? (
          <BannerMsg
            msg={data.bannerMsg.Message}
            source={data.bannerMsg.source}
          />
        ) : null}
        <TopSection className="articleInner">
          {data?.body ? <PortableText article blocks={data.body} /> : null}
        </TopSection>

        <Container className="articleInner">{content}</Container>
      </article>
    </>
  );
};
