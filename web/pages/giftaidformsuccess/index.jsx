import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import React from "react";

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

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Text = styled.p`
  text-align: center;
`;

const GiftAidFormSuccessPage = () => {
  return (
    <>
      <NextSeo
        title="Gift Aid Form Success"
        description="Gift aid form success."
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/giftaidformsuccess`}
      />
      <article>
        <TopSection>
          <Heading>Thank you for submitting the Gift Aid Form</Heading>
        </TopSection>
        <Main className="articleInner">
          <Text>Thank you for declaring your donations as Gift Aid.</Text>
        </Main>
      </article>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default GiftAidFormSuccessPage;
