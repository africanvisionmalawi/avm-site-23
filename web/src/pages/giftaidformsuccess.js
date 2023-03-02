import styled from "@emotion/styled";
import Layout from "components/Layout";

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

export default function Giftaidform() {
  return (
    <Layout
      title="Gift Aid Form Success"
      description="Gift aid form sucess."
      article={false}
    >
      <article>
        <TopSection>
          <Heading>Thank you for submitting the Gift Aid Form</Heading>
          <p>Thank you for declaring your donations as Gift Aid.</p>
        </TopSection>
      </article>
    </Layout>
  );
}
