import styled from "@emotion/styled";
import { BuyButton } from "components/common/BuyButton";
import { Carousel } from "components/common/Carousel";
import { SectionInner } from "components/common/SectionInner";
import { SectionTop } from "components/common/SectionTop";
import { PortableText } from "components/portable-text/BasePortableText";
import { Photo } from "components/shop/Photo";
import { ShopListItem } from "components/shop/ShopListItem";
import { TagsList } from "components/shop/TagsList";
import { siteMeta } from "constants/site";
import groq from "groq";
import { priceFormatted } from "lib/helpers";
import { NextSeo } from "next-seo";
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

export const Shop = ({ data }) => {
  if (!data) return;
  const { page, allProducts } = data;
  // console.log("data ", data);
  // console.log("page.Gallery ", page.photoGallery);
  // console.log("site ", site);
  // console.log("relatedProducts ", relatedProducts);

  const displayButtonCheck = (stock, price) => {
    if (stock > 0 && price > 0) {
      return true;
    }
  };

  const productPrice = page.salePrice
    ? page.salePrice
    : page.price
    ? page.price
    : null;
  // console.log("productPrice ", page);
  // console.log("allProducts ", allProducts);
  // console.log("page.tags ", page.tags);
  const relatedProducts = allProducts.filter(
    (prod) => prod.tags[0].value === page.tags[0].value
  );

  // console.log("relatedProducts ", relatedProducts);
  return (
    <>
      <NextSeo
        title={
          page.title
            ? `Shop - ${page.title} |  African Vision Malawi`
            : siteMeta.title
        }
        description={
          page?.description ? page?.description : siteMeta.description
        }
      />
      <article>
        <ShopSection>
          <article className="content">
            <SectionTop>
              <Heading>Shop - {page.title ? page.title : null}</Heading>
            </SectionTop>
            <Columns>
              <ColumnMain>
                {page.photoGallery && page.photoGallery.photos.length > 1 && (
                  <CarouselCont>
                    <Carousel
                      allSizesImages={page.photoGallery}
                      photoType="featured"
                    />
                  </CarouselCont>
                )}
                {page.photoGallery && page.photoGallery.photos.length === 1 && (
                  <PhotoCont>
                    <Photo
                      photo={page.photoGallery.photos[0]}
                      photoType="featured"
                    />
                  </PhotoCont>
                )}
              </ColumnMain>
              <ColumnAside>
                <div>
                  <SectionInner>
                    <Price>
                      {productPrice > 0 ? (
                        <>&pound;{priceFormatted(productPrice)}</>
                      ) : (
                        <>Donation</>
                      )}
                    </Price>
                    {displayButtonCheck(page.inStock, productPrice) ? (
                      <BuyButton
                        productId={page._id ? page._id : null}
                        name={page.title ? page.title : null}
                        description={page.description ? page.description : null}
                        price={productPrice}
                        image={
                          page.photoGallery && page.photoGallery.length
                            ? page.photoGallery[0].childImageSharp.fluid.src
                            : null
                        }
                        url={
                          page.slug
                            ? `${siteUrl}/shop/${page.slug.current}/`
                            : null
                        }
                        weight={page.weight ? page.weight : null}
                        length={page.length ? page.length : null}
                        width={page.width ? page.width : null}
                        height={page.height ? page.height : null}
                      />
                    ) : productPrice > 0 ? (
                      <p>
                        <strong>Out of stock</strong>
                      </p>
                    ) : null}

                    {page.tags && page.tags.length ? (
                      <TagsList tags={page.tags} />
                    ) : null}
                  </SectionInner>
                  <SectionInner>
                    {page.body ? <PortableText blocks={page.body} /> : null}
                  </SectionInner>
                </div>
              </ColumnAside>
            </Columns>
            {relatedProducts.length ? (
              <>
                <SubHeading>Related products</SubHeading>
                <ShopIndexList>
                  {relatedProducts.map((item, i) => (
                    <React.Fragment key={item.id}>
                      {i < 3 ? (
                        <ShopListItem
                          id={item._id}
                          slug={item.slug.current}
                          photo={item.photoGallery.photos[0]}
                          photoType="default"
                          title={item.title}
                          price={item.price}
                          salePrice={item.salePrice}
                        />
                      ) : null}
                    </React.Fragment>
                  ))}
                </ShopIndexList>
              </>
            ) : null}
          </article>
        </ShopSection>
        {/* <Donate
        link="https://www.charitycheckout.co.uk/1113786/"
        text="Donate"
        displayImage
      /> */}
      </article>
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
  // const hasCategory = slug.length > 1;
  // const currentSlug = hasCategory ? slug[slug.length - 1] : slug[0];
  const currentSlug = slug;
  // console.log("currentSlug ", currentSlug);
  const data = await client.fetch(query, { currentSlug });
  //   console.log("data **********", data);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default Shop;
