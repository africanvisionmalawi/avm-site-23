import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { Breadcrumbs } from "components/Breadcrumbs";
import { BuyButton } from "components/common/BuyButton";
import { NavTags } from "components/common/NavTags";
import { ShopListItem } from "components/shop/ShopListItem";
import { tagsBase } from "constants/shop";
import { siteMeta } from "constants/site";
import groq from "groq";
import { NextSeo } from "next-seo";
import React from "react";
import client from "/client";

const siteUrl = "https://www.africanvision.org.uk";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding: 3em 0;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  padding: 0 1rem;
  @media (min-width: 768px) {
    padding: 0 5rem;
  }
`;

const ShopIndexList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 40px;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
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

const ShopHomePage = ({ data }) => {
  const { products, site } = data;
  const title = "Shop";
  const description = "Welcome to our online shop.";
  const tags = site.shopTags;
  //   console.log("tags here *******", site.shopTags);

  const path = [
    {
      title: "Shop",
      slug: "/shop/",
    },
  ];

  return (
    <>
      <NextSeo
        title={`${title} |  African Vision Malawi` || siteMeta.title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/shop/`}
      />
      {path ? <Breadcrumbs path={path} indexPage={data?.indexPage} /> : null}
      <article className="col-wide">
        <Heading>{title}</Heading>
        <NavTags tags={tags} tagsBase={tagsBase} active={null} />
        <Container>
          <ShopIndexList>
            {data.products.map((item, i) => {
              const productPrice = item.salePrice
                ? item.salePrice
                : item.price
                ? item.price
                : null;
              const displayButtonCheck = (stock, price) => {
                if (item.inStock && productPrice > 0) {
                  return true;
                }
              };
              return (
                <React.Fragment key={item.id}>
                  <div>
                    {item.slug ? (
                      <>
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
                        {displayButtonCheck(item.inStock, productPrice) ? (
                          <BuyButton
                            productId={item._id ? item._id : null}
                            name={item.title ? item.title : null}
                            description={
                              item.description ? item.description : null
                            }
                            price={productPrice}
                            image={
                              item.photoGallery && item.photoGallery.length
                                ? item.photoGallery[0].childImageSharp.fluid.src
                                : null
                            }
                            url={
                              item.slug
                                ? `${siteUrl}/shop/${item.slug.current}/`
                                : null
                            }
                            weight={item.weight ? item.weight : null}
                            length={item.length ? item.length : null}
                            width={item.width ? item.width : null}
                            height={item.height ? item.height : null}
                          />
                        ) : productPrice > 0 ? (
                          <p>
                            <strong>Out of stock</strong>
                          </p>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </React.Fragment>
              );
            })}
          </ShopIndexList>
        </Container>
      </article>
    </>
  );
};

const query = groq`{
"products":*[_type == "shop" && hide != true] | order(publishDate desc)
{     
  _id,
    title,
  publishDate,
  slug,
  hide,
  inStock,
  price,
  salePrice,
  tags {
    label,
    value,
  },
  photoGallery, 
},
'site':*[_type == "siteSettings"][0]
{
  shopTags,  
}


}

`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"

  const data = await client.fetch(query, {});
  //   console.log("data **********", data);

  return {
    props: {
      data,
      preview,
    },
  };
}

export default ShopHomePage;
