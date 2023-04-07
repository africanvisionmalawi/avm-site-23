import styled from "@emotion/styled";
// import { Image } from "components/common/image/Image";
import { Gallery } from "components/gallery";
import { Hero } from "components/Hero";
import { PageLinks } from "components/page-links";
import { PortableText } from "components/portable-text/BasePortableText";
import { Videos } from "components/videos";
import { siteMeta } from "constants/site";
import { format, parseISO } from "date-fns";
import fs, { readdirSync } from "fs";
import matter from "gray-matter";
import groq from "groq";
import { NextSeo } from "next-seo";
import { join } from "path";

// import md from "markdown-it";
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

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Page = ({ data, currentSlug }) => {
  // console.log("data here is ***** ", data);
  // const { sanityPost } = data;
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
            {/* {page.photo ? (
              <Image
                image={page.photo}
                maxWidth={800}
                height={540}
                alt={page.photo.alt}
              />
            ) : null} */}
          </section>
        </article>
      </>
    );
  }

  if (data?.markDownPost) {
    const { frontmatter, content } = data.markDownPost;
    // console.log("data.markDownPost **** ", data.markDownPost);

    return (
      <>
        <NextSeo
          title={
            `${frontmatter.title} |  African Vision Malawi` || siteMeta.title
          }
          description={
            frontmatter.excerpt ? frontmatter.excerpt : siteMeta.description
          }
          canonical={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }/news/${frontmatter.path.replace("/posts/", "")}`}
        />
        <article className="articleInner">
          <h1>{frontmatter.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: md.render(
                content.replace("http://www.africanvision.org.uk", ``)
              ),
            }}
          />
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
  // content[] {        
  //   ...
  //   pageLinks {
  //     ...
  //     pageLinks[] {
  //       ...
  //       url->
  //     }
  //   },     
  // },  
}`;

export async function getStaticPaths() {
  const allSanityPosts = await client.fetch(
    ` *[_type == "news" && slug.current != null] {
      'slug': slug.current,      
    }`
  );

  const getFileList = (dirName) => {
    let files = [];
    const items = readdirSync(dirName);

    for (const item of items) {
      if (fs.statSync(dirName + "/" + item).isDirectory()) {
        files = [...files, ...getFileList(`${dirName}/${item}`)];
      } else {
        files.push(`${dirName}/${item}`);
      }
    }

    return files;
  };

  const slugs = getFileList("posts");
  // console.log("slugs ", slugs);

  const allMarkdownPosts = slugs
    .map((slug) => {
      let dirPath = join("posts", slug);
      const fileContents = fs.readFileSync(slug, "utf8");
      const { data, content } = matter(fileContents);
      const date = format(parseISO(data.date), "MMMM dd, yyyy");
      return { slug: slug, frontmatter: { ...data, date }, content };
    })
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
        ? -1
        : 1
    );

  // console.log("allMarkdownPosts ", allMarkdownPosts)

  const allMarkdownPaths = allMarkdownPosts.map((post) => {
    return {
      slug: post.slug.replace("posts/", "").replace(".md", ""),
    };
  });

  // console.log("allMarkdownPaths ", allMarkdownPaths);

  // const allPosts = [
  //   ...allSanityPosts,
  //   "news/2016/08/raffle-tickets-for-this-beautiful-blanket/",
  // ];
  const allPosts = [...allSanityPosts, ...allMarkdownPaths];

  console.log("allPosts ", allPosts);

  console.log(
    "all posts map **** ",
    allPosts?.map((page) => {
      return page?.slug?.replace("posts/", "").replace(".md", "");
    })
  );
  return {
    paths:
      allPosts?.map((page) => ({
        params: {
          // slug: [page.slug],
          slug: [page?.slug?.replace("posts/", "").replace(".md", "")],
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const data = {};
  console.log("params ", params);
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  const hasCategory = !!slug.length > 1;
  const slugLength = slug.length;
  const currentSlug = hasCategory ? slug[slug.length - 1] : slug.toString();
  console.log("currentSlug ", currentSlug);
  // console.log("slug ", slug[slug.length - 1]);
  data.sanityPost = await client.fetch(query, { currentSlug, hasCategory });
  // console.log("data ", data);

  if (!data.sanityPost) {
    // check for markdown news
    // console.log("getting markdown post ", slug);
    const fileName = fs.readFileSync(`posts/${slug.join("/")}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    data.markDownPost = {
      frontmatter: frontmatter,
      content: content,
    };
  }

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
