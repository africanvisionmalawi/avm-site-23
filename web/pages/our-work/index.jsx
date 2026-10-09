import styled from "@emotion/styled";
import { Breadcrumbs } from "components/Breadcrumbs";
import { OurWork } from "components/ourwork";
import { MarkdownContent } from "components/common/MarkdownContent";
import { getOurWork } from "lib/content";
import { NextSeo } from "next-seo";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
`;

const TopSection = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding: 3rem 1rem 0;
  position: relative;
  @media (min-width: 768px) {
    padding: 1rem 0 0;
  }
`;

const Page = ({ data }) => {
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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/our-work`}
      />
      <Breadcrumbs path={path} indexPage={null} />
      <article className="articleInner">
        <TopSection>
          <Heading>{title}</Heading>
          {ourWork ? <MarkdownContent content={body} /> : null}
        </TopSection>
        {ourWork ? (
          <Container>
            <OurWork ourWork={ourWork} />
          </Container>
        ) : null}
      </article>
    </>
  );
};

export async function getStaticProps() {
  const data = getOurWork();
  return {
    props: {
      data,
    },
  };
}

export default Page;
