import styled from "@emotion/styled";
import { Hero } from "components/Hero";
import { Gallery } from "components/gallery";
import { PageLinks } from "components/page-links";
import { PortableText } from "components/portable-text/BasePortableText";
import { Videos } from "components/videos";
import { siteMeta } from "constants/site";
import groq from "groq";
import { NextSeo } from "next-seo";
import client from "/client";

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
          {page.photo && (
            <div>
              <Hero
                image={page.photo}
                displayHeroMsg={false}
                // heroHeading={c.title}
                // heroHeadingType="h2"
              />
              {/* <Image image={page.hero.image.asset} /> */}
            </div>
          )}

          <section className="articleInner">
            {page.body ? <PortableText article blocks={page.body} /> : null}
          </section>
          <section className="articleInner">
            <Container>{content}</Container>
          </section>
        </article>
      </>
    );
  }
};

const query = groq`*[_type == "news" && slug.current == $currentSlug][0]{ 
  slug, 
  id,
  title,
  description,
  photo,
  excerpt,
  body[] {
    ...,
    asset->     
  },    
  content,
  tags,
  pageHeading, 
  publishDate,    
}`;

export async function getStaticPaths() {
  const allSanityPosts = await client.fetch(
    ` *[_type == "news" && slug.current != null] {
      'slug': slug.current,      
    }`
  );

  // console.log("allMarkdownPaths ", allMarkdownPaths);

  const allPosts = [...allSanityPosts];

  // console.log(
  //   "all posts map **** ",
  //   allPosts?.map((page) => {
  //     return page?.slug?.replace("posts/", "").replace(".md", "");
  //   })
  // );
  return {
    paths:
      allPosts?.map((page) => ({
        params: {
          slug: [page?.slug?.replace(/newsposts\//, "").replace(/\.md/, "")],
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const data = {};

  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  const hasCategory = !!slug.length > 1;

  const currentSlug = hasCategory ? slug[slug.length - 1] : slug.toString();
  // console.log("currentSlug ", currentSlug);

  data.sanityPost = await client.fetch(query, { currentSlug, hasCategory });

  return {
    props: {
      data,
      preview,
      currentSlug,
    },
    revalidate: 10,
  };
}

export default Page;
