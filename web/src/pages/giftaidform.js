import styled from "@emotion/styled";
import { Donate } from "components/common/Donate";
import Layout from "components/Layout";
import { GiftAidForm } from "../components/gift-aid-form/GiftAidForm";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 3em 0;
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

export default function Giftaidform() {
  return (
    <Layout title="Gift Aid Form" description="Gift aid form." article={false}>
      <article>
        <TopSection>
          <Heading>Gift Aid Form</Heading>
        </TopSection>

        <Container>
          <GiftAidForm />
        </Container>

        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
    </Layout>
  );
}
