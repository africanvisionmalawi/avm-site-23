import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import { CardPostAlt } from "../../components/card/CardPostAlt";
// import { CardPost } from "../components/card/CardPost";
// import BlogRoll from "../components/BlogRoll";
// import ArticleList from "../components/ArticleList";
import { Donate } from "../../components/common/Donate";
// import { NavTags } from "../components/common/nav-tags";
import Layout from "../components/Layout";
// import paginationStyles from "../components/pagination.module.css";
// import postStyles from "../components/posts.module.css";
// import { tags, tagsBase } from "../constants/news";

// const Section = styled.section`
//   margin: 0 auto;
//   max-width: 1050px;
//   width: 100%;
// `;

const Heading = styled.h1`
  text-align: center;
`;

const TextSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 885px;
  padding: 3em 2em 2em;
  position: relative;
  width: 100%;
`;

const Pagination = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
  & a {
    border-radius: 3px;
    display: inline-block;
    margin: 4px;
    padding: 4px;
  }

  & a:link,
  & a:visited {
    background: #fff;
    border: 1px solid #f99d1c;
    color: #f99d1c;
  }
  & a:hover {
    background: #f99d1c;
    border: 1px solid #f99d1c;
    color: #fff;
  }
  & span {
    background: #fff;
    border: #cacaca;
    color: #999;
    cursor: default;
  }
`;

const PaginationText = styled.div`
  text-align: center;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(1fr, 1fr));
  grid-gap: 3rem;
  grid-auto-flow: dense;
  margin: 2rem auto;
  max-width: 1180px;
`;

const PaginationLink = (props) => {
  if (!props.active) {
    return <Link to={`/news/${props.url}`}>{`${props.text}`}</Link>;
  } else {
    return <span disabled>{props.text}</span>;
  }
};

const NewsIndex = ({ pageContext }) => {
  const { group, index, pageCount, first, last } = pageContext;
  const previousUrl = index - 1 === 1 ? "" : (index - 1).toString() + "/";
  const nextUrl = (index + 1).toString() + "/";
  // const pageNumbers = new Array(pageCount)
  //   .fill(undefined)
  //   .map((_, index) => index + 1);

  const title = "Latest news - African Vision Malawi";
  const description = "Latest news from African Vision Malawi.";

  // console.log("group ", group);

  return (
    <Layout title={title} description={description} article={false}>
      <section className="section section--gradient">
        <div className="container">
          <article className="content">
            <div className="columns">
              <main>
                <TextSection>
                  <Heading>Latest news</Heading>
                  {/* <NavTags tags={tags} tagsBase={tagsBase} /> */}
                  {/* <ArticleList posts={group} /> */}

                  <PostList>
                    {group.map((post) => {
                      // console.log("post ", post);
                      const type = post.node._type ? "sanity" : "markdown";
                      const title = post.node.title
                        ? post.node.title
                        : post.node.frontmatter.title;
                      const excerpt = post.node._rawExcerpt
                        ? post.node._rawExcerpt
                        : post.node.excerpt;
                      const slug = post.node.slug
                        ? post.node.slug.current
                        : post.node.frontmatter.path.replace("/posts/", "/");
                      const publishDate = post.node.publishDate
                        ? post.node.publishDate
                        : post.node.frontmatter.date;
                      return (
                        <React.Fragment key={post.node.id}>
                          <CardPostAlt
                            type={type}
                            title={title}
                            excerpt={excerpt}
                            slug={slug}
                            publishDate={publishDate}
                          />
                        </React.Fragment>
                      );
                    })}
                  </PostList>
                  <Pagination>
                    {first ? (
                      <PaginationLink
                        active={true}
                        test={first}
                        url={previousUrl}
                        text="← Prev"
                      />
                    ) : (
                      <PaginationLink
                        test={first}
                        url={previousUrl}
                        text="← Prev"
                      />
                    )}
                    <PaginationText>
                      page {index} of {pageCount}
                    </PaginationText>
                    {/* {pageNumbers.map((number) => {
                      const isActive =
                        location.pathname.indexOf(number) > -1 ||
                        (location.pathname === "/blog/" && number === 1);

                      return number <= 5 || number > pageCount - 5 ? (
                        <PaginationLink
                          test={isActive}
                          url={`${number === 1 ? "" : number}/`}
                          text={number}
                        />
                      ) : null;
                    })} */}
                    {last ? (
                      <PaginationLink
                        active={true}
                        test={last}
                        url={nextUrl}
                        text="Next →"
                      />
                    ) : (
                      <PaginationLink test={last} url={nextUrl} text="Next →" />
                    )}
                  </Pagination>
                </TextSection>
              </main>
              <Donate
                link="https://www.charitycheckout.co.uk/1113786/"
                text="Donate"
                displayImage
              />
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default NewsIndex;
