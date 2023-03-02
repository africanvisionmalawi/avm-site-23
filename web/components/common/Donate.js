import styled from "@emotion/styled";
import { Hero } from "../Hero";
import { CtaButton } from "./CtaButton";

const Container = styled.div`
  background: #58b5d7;
  margin-bottom: 3em;
  padding: 30px 0;
  text-align: center;
`;

export const Donate = (props) => {
  const donateImage = useStaticQuery(
    graphql`
      query {
        donateImageDesktop: file(
          relativePath: { eq: "hero/donate-desktop.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1918, maxHeight: 540, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        donateImageMobile: file(
          relativePath: { eq: "hero/donate-mobile.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 480, maxHeight: 300, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `
  );

  return (
    <>
      {props.displayImage ? (
        <Hero
          fluid={donateImage.donateImageDesktop.childImageSharp.fluid}
          fluidMobile={donateImage.donateImageMobile.childImageSharp.fluid}
        >
          <p>
            Donate now to help us help children &amp; vulnerable people in
            Malawi.
          </p>
          <CtaButton link={props.link} text={props.text} placement="alt" />
        </Hero>
      ) : (
        <Container>
          <CtaButton link={props.link} text={props.text} placement="alt" />
        </Container>
      )}
    </>
  );
};
