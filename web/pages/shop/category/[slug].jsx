import styled from "@emotion/styled";
import { NavTags } from "components/common/NavTags";
import { ShopListItem } from "components/shop/ShopListItem";
import { tagsBase } from "constants/shop";
import { siteMeta } from "constants/site";
import groq from "groq";
import { NextSeo } from "next-seo";
import React from "react";
import client from "/client";

const siteUrl = "https://www.africanvision.org.uk";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 3em 0;
`;

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
  width: 100%;
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

const NoResultsContainer = styled.div`
  text-align: center;
`;

const NoResults = () => {
  return (
    <NoResultsContainer>
      <h2>Sorry, no items found for that category.</h2>
    </NoResultsContainer>
  );
};

export const ShopCategory = ({ data, slug }) => {
  if (!data) return;
  const { products, site } = data;
  const tags = site.shopTags;
  const currentTag = tags.find((tag) => tag.value.current === slug);
  // console.log("currentTag ", currentTag);

  const filteredProducts = products.filter(
    (prod) => prod.tags[0].value === slug
  );

  return (
    <>
      <NextSeo
        title={
          currentTag.title
            ? `Shop - ${currentTag.title} |  African Vision Malawi`
            : siteMeta.title
        }
        description={
          data?.description ? data?.description : siteMeta.description
        }
      />
      <article>
        <Heading>Shop - {currentTag.title}</Heading>
        <NavTags tags={tags} tagsBase={tagsBase} active={null} />
        <Container>
          {filteredProducts.length ? (
            <ShopIndexList>
              {filteredProducts.map((item, i) => {
                return (
                  <React.Fragment key={item.id}>
                    <ShopListItem
                      id={item.id}
                      slug={item.slug.current}
                      photo={
                        item?.photoGallery?.photos?.length
                          ? item?.photoGallery?.photos[0]
                          : null
                      }
                      photoType="default"
                      title={item.title}
                      price={item.price}
                      salePrice={item.salePrice}
                    />
                  </React.Fragment>
                );
              })}
            </ShopIndexList>
          ) : (
            <NoResults />
          )}
        </Container>
      </article>
    </>
  );
};

const query = groq`{
"products":*[_type == "shop" && hide != true]
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

'site':*[_type == "siteSettings"][0]
{
  shopTags,  
},



}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "shop" && defined[slug.current]][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  const data = await client.fetch(query, { slug });
  // console.log("data **********", data);

  if (!data) {
    return false;
  }

  return {
    props: {
      data,
      slug,
      preview,
    },
    revalidate: 10,
  };
}

export default ShopCategory;
