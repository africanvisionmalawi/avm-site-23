import { PageShop } from "components/shop/PageShop";
import { PreviewPageShop } from "components/shop/PreviewPageShop";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import React from "react";
import client from "/client";

export const Shop = ({ preview, data, queryParams, currentSlug, token }) => {
  // if (!data) return;

  return (
    <>
      {preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewPageShop
            query={query}
            queryParams={queryParams}
            currentSlug={currentSlug}
            token={token}
          />
        </PreviewSuspense>
      ) : (
        <PageShop data={data} currentSlug={currentSlug} />
      )}
    </>
  );
};

const query = groq`{
"page":*[_type == "shop" && hide != true && slug.current == $slug][0]
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


"allProducts":*[_type == "shop" && hide != true && slug.current != $slug]
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

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  const currentSlug = slug;
  const queryParams = { slug: currentSlug };
  console.log("queryParams ", queryParams);
  // const hasCategory = slug.length > 1;
  // const currentSlug = hasCategory ? slug[slug.length - 1] : slug[0];
  // console.log("currentSlug ", currentSlug);

  if (preview && previewData?.token) {
    return { props: { preview, queryParams, token: previewData.token } };
  }

  const data = await client.fetch(query, { slug: currentSlug });
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
