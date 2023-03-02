// import SanityImage from "gatsby-plugin-sanity-image";
import styled from "@emotion/styled";
import { Breadcrumbs } from "components/Breadcrumbs";
import { graphql, Link } from "gatsby";
import { Donate } from "../../components/common/Donate";
import { Gallery } from "../../components/gallery";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import InfoRows from "../components/InfoRows";
import { Hero } from "../../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import { PortableText } from "../../components/portable-text/BasePortableText";
import Layout from "../components/Layout";
// import Pricing from "../components/pricing";
// import SEO from "../components/seo";

export const query = graphql`
  query NewsTemplateQuery($id: String!) {
    page: sanityNews(id: { eq: $id }) {
      id
      title
      description
      slug {
        current
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 10 })
      photo {
        _key
        alt
        ...ImageWithPreview
      }
      content {
        ... on SanityBlockPortableText {
          _key
          _type
          _rawBlocks(resolveReferences: { maxDepth: 10 })
        }
        ... on SanityPhotoGallery {
          photos {
            _key
            alt
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;

const News = (props) => {
  const { data, errors } = props;
  // console.log("props ", props);
  if (errors) {
    console.log("errors");
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  // const site = (data || {}).site;

  //   if (!site) {
  //     throw new Error(
  //       'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //     );
  //   }
  // console.log("data ", data);

  if (!data) {
    return "Error! data not found";
  }
  const page = data.page;

  const content = (page._rawContent || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      // console.log("type ", c._type);
      switch (c._type) {
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
        default:
          el = null;
      }
      return el;
    });

  //   const menuItems = page.navMenu && (page.navMenu.items || []);
  //   const pageTitle = data.route && !data.route.useSiteTitle && page.title;
  const pageHeading = page.title ? page.title : "";
  const path = [
    {
      title: "News",
      slug: "news",
    },
    {
      title: page.title,
      slug: page.slug.current,
    },
  ];

  return (
    // <div>{page.title} </div>
    <Layout
      title={page.title ? page.title : ""}
      description={page.description ? page.description : ""}
      article={false}
    >
      {path ? <Breadcrumbs path={path} /> : null}
      <article>
        {page.hero ? (
          <Hero
            fluid={page.hero.image.asset.fluid}
            displayHeroMsg={true}
            heroHeading={page.title}
            heroHeadingType="h1"
          />
        ) : (
          <TopSection>
            <Heading>{pageHeading}</Heading>
          </TopSection>
        )}
        <Main>
          {page._rawBody ? (
            <TextSection>
              <PortableText value={page._rawBody} />
            </TextSection>
          ) : null}
          {/* <div>{content}here</div> */}
        </Main>
        {content}
        <ViewAll>
          <Link to="/news/">View all news</Link>
        </ViewAll>
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
    </Layout>
  );
};

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
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 0 4em 2rem;
  }
  @media (min-width: 1040px) {
    padding: 0 8em 2rem;
  }
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const ViewAll = styled.div`
  margin: 2.4em 0;
  text-align: center;
`;

export default News;
