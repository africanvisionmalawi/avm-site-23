import styled from "@emotion/styled";
import { Hero } from "components/Hero";
import { EventSummary } from "components/events/EventSummary";
import { Gallery } from "components/gallery";
import { PageLinks } from "components/page-links";
import { MarkdownContent } from "components/common/MarkdownContent";
import { Videos } from "components/videos";
import { siteMeta } from "constants/site";
import { getAllNews, getNewsBySlug } from "lib/content";
import { NextSeo } from "next-seo";

const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

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

const PostInner = styled.div`
  padding: 0 1rem;
`;

const Page = ({ data, currentSlug }) => {
  // console.log("data here is ***** ", data);
  if (data?.sanityPost) {
    const page = data.sanityPost;
    const content = (page.content || [])
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
                <MarkdownContent
                  key={c._key}
                  content={c.markdown || c.blocks}
                />
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
          title={`${page.title} |  African Vision Malawi` || siteMeta.title}
          description={
            page.description ? page.description : siteMeta.description
          }
          canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/news/${currentSlug}`}
        />
        <article>
          <section className="articleInner">
            <h1>{page.title}</h1>
          </section>
          {page.photo && !page.hideHeaderPhoto ? (
            <div>
              <Hero
                image={page.photo}
                displayHeroMsg={false}
                // heroHeading={c.title}
                // heroHeadingType="h2"
              />
              {/* <Image image={page.hero.image.asset} /> */}
            </div>
          ) : null}

          <section className="articleInner">
            {page.body ? <MarkdownContent content={page.body} /> : null}
          </section>
          {page.event ? (
            <section className="articleInner">
              <EventSummary data={page.event} displayTitle displayLink />
            </section>
          ) : null}
          <section className="articleInner">
            <Container>{content}</Container>
          </section>
        </article>
      </>
    );
  }
};

export async function getStaticPaths() {
  const allPosts = getAllNews();
  return {
    paths: allPosts.map((page) => ({
      params: {
        slug: [page.slug.current],
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const { slug = [] } = params;
  const currentSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;
  const sanityPost = getNewsBySlug(currentSlug);

  if (!sanityPost) {
    return { notFound: true };
  }

  return {
    props: {
      data: { sanityPost },
      preview,
      currentSlug,
    },
  };
}

export default Page;
