import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React from "react";
import { NavTags } from "../../components/common/NavTags";
import { SectionTop } from "../../components/common/SectionTop";
import { ShopListItem } from "../../components/shop/ShopListItem";
import { tagsBase } from "../../constants/shop";
import Errors from "../components/errors";
import Layout from "../components/Layout";

export const query = graphql`
  query ShopTagsTemplateQuery($value: String!) {
    shopByTagAll: allSanityShop(
      filter: {
        slug: { current: { ne: null } }
        tags: { elemMatch: { value: { eq: $value } } }
        hide: { ne: true }
      }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          inStock
          price
          salePrice
          tags {
            label
            value
          }
          photoGallery {
            photos {
              _key
              alt
              ...ImageWithPreview
            }
          }
        }
      }
    }
    tags: allSanitySiteSettings {
      edges {
        node {
          shopTags {
            title
            value {
              current
            }
          }
        }
      }
    }
  }
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
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

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
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

const ShopTagPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  if (!data) {
    return "Error! data not found";
  }

  const allShopProducts = data.shopByTagAll.edges;
  const tagTitle = props.pageContext.title;
  const tag = props.pageContext.value;
  const title = `${tagTitle}`;
  const description = "Welcome to our online shop.";

  const tags = data.tags.edges[0].node.shopTags;

  return (
    <>
      <Layout title={title} description={description} article={false}>
        <article>
          <SectionTop>
            <Heading>{title}</Heading>
            <NavTags tags={tags} tagsBase={tagsBase} active={tag} />
          </SectionTop>
          <Container>
            {allShopProducts.length ? (
              <ShopIndexList>
                {allShopProducts.map((item) => (
                  <React.Fragment key={item.node.id}>
                    <ShopListItem
                      id={item.node.id}
                      slug={item.node.slug.current}
                      photo={item.node.photoGallery.photos[0]}
                      photoType="default"
                      title={item.node.title}
                      price={item.node.price}
                    />
                  </React.Fragment>
                ))}
              </ShopIndexList>
            ) : (
              <NoResults />
            )}
          </Container>
        </article>
      </Layout>
    </>
  );
};

export default ShopTagPage;
