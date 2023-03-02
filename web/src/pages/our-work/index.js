import styled from "@emotion/styled";
import { Donate } from "components/common/Donate";
import Errors from "components/errors";
import Layout from "components/Layout";
import { OurWork } from "components/ourwork";
import { PortableText } from "components/portable-text/BasePortableText";
import { graphql } from "gatsby";

export const query = graphql`
  query OurWorkPageQuery {
    ourWork: allSanityOurWorkShared {
      edges {
        node {
          _rawBody(resolveReferences: { maxDepth: 10 })
          ourWork {
            _key
            title
            photo {
              alt
              ...ImageWithPreview
            }
            _rawBody(resolveReferences: { maxDepth: 10 })
            slug {
              current
            }
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }
  const ourWork = data.ourWork.edges;

  return (
    <Layout
      title="Our work"
      description="We work with and through communities to develop long-term and sustainable solutions to the welfare of orphans and vulnerable people in four key areas: self-sufficiency, health, education and water and sanitation. Additionally we are passionate about the environment, paying close attention to ecological building, reforestation and permaculture."
      article={false}
    >
      <article>
        <TopSection>
          <Heading>Our work</Heading>
          {ourWork ? <PortableText value={ourWork[0].node._rawBody} /> : null}
        </TopSection>
        {ourWork ? (
          <Container>
            <OurWork ourWork={ourWork[0].node.ourWork} />
          </Container>
        ) : null}
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

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

export default IndexPage;
