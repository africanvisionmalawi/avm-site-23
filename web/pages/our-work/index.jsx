import styled from "@emotion/styled";
import { Breadcrumbs } from "components/Breadcrumbs";
import { OurWork } from "components/ourwork";
import { PortableText } from "components/portable-text/BasePortableText";
import groq from "groq";
import { NextSeo } from "next-seo";
import client from "/client";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
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

const TextSection = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2rem 4em;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em;
  }
`;

const ContentSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Page = ({ data }) => {
  // console.log("content here is ***************** ", data?.content);
  // console.log("data here is ***************** ", data);
  const { body, ourWork } = data;
  const title = "Our Work";
  const path = [
    {
      title: title,
      slug: "our-work",
    },
  ];
  return (
    <>
      <NextSeo
        title={`
          ${title} |  African Vision Malawi`}
        description="We work with and through communities to develop long-term and sustainable solutions to the welfare of orphans and vulnerable people in four key areas: self-sufficiency, health, education and water and sanitation."
      />
      <Breadcrumbs path={path} indexPage={null} />
      <article>
        <TopSection>
          <Heading>{title}</Heading>
          {ourWork ? <PortableText blocks={body} /> : null}
        </TopSection>
        {ourWork ? (
          <Container>
            <OurWork ourWork={ourWork} />
          </Container>
        ) : null}
        {/* <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        /> */}
      </article>
    </>
  );
};

const query = groq`*[_type == "ourWorkShared"][0]{   
  id, 
  body,
  ourWork,  
}`;

export async function getStaticProps({ params, preview = false }) {
  const data = await client.fetch(query);
  // console.log("data ", data);
  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default Page;
