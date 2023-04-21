import styled from "@emotion/styled";
import { PageShop } from "components/shop/PageShop";
import { PreviewPageShop } from "components/shop/PreviewPageShop";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import React from "react";
import client from "/client";

const siteUrl = "https://www.africanvision.org.uk";

const CarouselCont = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  width: 85%;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
  @media (min-width: 1024px) {
    margin-left: auto;
  }
`;

const PhotoCont = styled.div`
  max-width: 600px;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const ShopSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const SubHeading = styled.h2`
  margin-top: 3rem;
  text-align: center;
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ColumnMain = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 66.66666%;
  }
`;
const ColumnAside = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 33.333333%;
  }
`;

const Price = styled.span`
  display: block;
  font-size: 2rem;
  margin-bottom: 1.6rem;
`;

const ShopIndexList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 40px;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0 0 2rem;
  & li {
    list-style-type: none;
    margin: 8px 0;
    opacity: 0.9;
    padding: 0;
    position: relative;
  }
  & li:hover {
    opacity: 1;
  }
`;

export const Shop = ({ preview, data, query, currentSlug }) => {
  if (!data) return;

  return (
    <>
      {preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewPageShop query={query} currentSlug={currentSlug} />
        </PreviewSuspense>
      ) : (
        <PageShop data={data} currentSlug={currentSlug} />
      )}
    </>
  );
};

const query = groq`{
"page":*[_type == "shop" && hide != true && slug.current == $currentSlug][0]
{     
  _id,
    title,
    description,
    body,
  publishDate,
  slug,
  hide,
  inStock,
  price,
  salePrice,
  tags, 
  photoGallery,   
  name,
  url,
  weight,
  length,
  width,
  height,
},


"allProducts":*[_type == "shop" && hide != true && slug.current != $currentSlug]
{     
  _id,
    title,
  publishDate,
  slug,
  hide,
  inStock,
  price,
  salePrice,
  tags,
  photoGallery, 
},

}`;

export async function getStaticPaths() {
  const allPages = await client.fetch(
    ` *[_type == "shop" && slug.current != null && hide != true] {
      'slug': slug.current,            
    }`
  );
  return {
    paths:
      allPages?.map((page) => ({
        params: {
          slug: page.slug,
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  // const hasCategory = slug.length > 1;
  // const currentSlug = hasCategory ? slug[slug.length - 1] : slug[0];
  const currentSlug = slug;
  // console.log("currentSlug ", currentSlug);

  if (preview) {
    return { props: { preview, currentSlug } };
  }

  const data = await client.fetch(query, { currentSlug });
  //   console.log("data **********", data);

  return {
    props: {
      data,
      preview,
      currentSlug,
    },
  };
}

export default Shop;
