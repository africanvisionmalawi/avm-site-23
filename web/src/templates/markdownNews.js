import styled from "@emotion/styled";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
// import { HeroImage } from "../components/common/HeroImage";
// import Content, { HTMLContent } from "../components/Content";
import { Donate } from "../../components/common/Donate";
import Layout from "../components/Layout";
// import { TagsList } from "../components/shop/tagsList";

const TextSection = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 885px;
  padding: 1rem 1rem 2rem;
  position: relative;
  width: 100%;
  @media (min-width: 580px) {
    padding-top: 2rem;
  }
`;

const SubHeading = styled.div`
  color: #a8afb9;
  font-size: 0.8rem;
  margin-bottom: 2rem;
`;

// const HeroCont = styled.div`
//   margin: 0 auto;
//   max-width: 1024px;
//   width: 100%;
// `;

// const ViewAll = styled.div`
//   margin: 2.4em 0;
//   text-align: center;
// `;

const HTMLContent = ({ content, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: content
        ? content.replace("http://www.africanvision.org.uk", ``)
        : content,
    }}
  />
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  featuredImage,
  date,
}) => {
  const PostContent = contentComponent || Content;
  // var pdfUrl = "";
  // var pdfName = "";
  // if (pdf_upload !== null && pdf_upload !== "") {
  //   pdfUrl = pdf_upload.replace("../../../static", "");
  //   pdfName = pdf_upload.replace("../../../static/img/", "");
  // }

  return (
    <section>
      <div>
        <article>
          {/* {featuredImage && featuredImage !== "" ? (
            <HeroCont>
              <HeroImage
                heroImage={featuredImage}
                // displayHeroMsg={true}
                // heroHeading={title}
                // heroHeadingType="h1"
              />
            </HeroCont>
          ) : null} */}
          <TextSection>
            <h1>{title}</h1>
            <SubHeading>{date}</SubHeading>
            <PostContent content={content} />
            {/* {pdf_upload && pdf_upload !== "" ? (
              <div className={postStyles.fileDownload}>
                <a href={pdfUrl}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={postStyles.pdfDownload}
                    viewBox="0 0 384 512"
                  >
                    <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" />
                  </svg>
                  Download {pdfName}
                </a>
              </div>
            ) : null} */}
            {/* {tags && tags.length ? <TagsList tags={tags} /> : null} */}
            {/* <ViewAll>
              <Link to="/news/">View all news</Link>
            </ViewAll> */}
          </TextSection>
          <Donate
            link="https://www.charitycheckout.co.uk/1113786/"
            text="Donate"
            displayImage
          />
        </article>
      </div>
    </section>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.excerpt}
      article={true}
    >
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={post.frontmatter.date}
        description={post.frontmatter.excerpt}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        featuredImage={post.frontmatter.featuredImage}
        // pdf_upload={post.frontmatter.pdf_upload}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1100, maxHeight: 440, quality: 50) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;
