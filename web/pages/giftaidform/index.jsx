import styled from "@emotion/styled";
import { GiftAidForm } from "components/gift-aid-form/GiftAidForm";
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

const GiftAidFormPage = () => {
  //   console.log("data here ", data);

  return (
    <>
      <NextSeo
        title="Gift Aid Form"
        description="Gift aid form."
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/giftaidform`}
      />
      <article>
        <TopSection>
          <Heading>Gift Aid Form</Heading>
        </TopSection>
        <Main className="articleInner">
          <GiftAidForm />
        </Main>
      </article>
    </>
  );
};

export async function getStaticProps(context) {
  //   const fs} = require("fs/promises"); // LOOK HERE

  return {
    props: {},
  };
}

export default GiftAidFormPage;
