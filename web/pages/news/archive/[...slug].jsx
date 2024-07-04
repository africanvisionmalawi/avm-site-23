import styled from "@emotion/styled";
import { siteMeta } from "constants/site";
import { format, parseISO } from "date-fns";
import fs, { readdirSync } from "fs";
import matter from "gray-matter";
import groq from "groq";
import { NextSeo } from "next-seo";
import { join } from "path";

const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

const PostInner = styled.div`
  padding: 0 1rem;
`;

const NewsFooter = styled.section`
  border-top: 1px solid #b75906;
  margin-top: 2rem;
  text-align: right;
`;

const Page = ({ data }) => {
  // console.log("data here is ***** ", data);

  if (data?.markDownPost) {
    const { frontmatter, content } = data.markDownPost;
    // console.log("data.markDownPost **** ", data.markDownPost);
    // console.log("title **** ", frontmatter.title);
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
          }/news/archive/${frontmatter.path.replace(/\/posts\//, "")}`}
        />
        <article className="articleInner">
          <PostInner>
            <h1>{frontmatter.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: md.render(
                  content.replace("http://www.africanvision.org.uk", ``)
                ),
              }}
            />
          </PostInner>
        </article>
        <NewsFooter className="articleInner">
          <p>
            <a href="/news/">Recent News</a>
          </p>
        </NewsFooter>
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
  hideHeaderPhoto,
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

  const slugs = getFileList("newsposts");
  // console.log("slugs ", slugs);

  const allMarkdownPosts = slugs
    .map((slug) => {
      let dirPath = join("newsposts", slug);
      const fileContents = fs.readFileSync(slug, "utf8");
      const { data, content } = matter(fileContents);
      const date = format(parseISO(data.date), "MMMM dd, yyyy");
      return {
        slug,
        frontmatter: { ...data, date },
        content,
      };
    })
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
        ? -1
        : 1
    );

  // console.log("allMarkdownPosts ", allMarkdownPosts)

  const allMarkdownPaths = allMarkdownPosts.map((post) => {
    return {
      // slug: post.slug.replace("posts/", "").replace(".md", ""),
      slug: decodeURI(post.frontmatter.path),
    };
  });

  // console.log("allMarkdownPaths ", allMarkdownPaths);

  const allPosts = [...allMarkdownPaths];

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

  const source = fs.readFileSync(`newsposts/${slug.join("/")}.md`, "utf-8");
  const { data: frontmatter, content } = matter(source);
  data.markDownPost = {
    frontmatter: frontmatter,
    content: content,
  };

  return {
    props: {
      data,
      preview,
    },
  };
}

export default Page;
