import imageUrlBuilder from "@sanity/image-url";
import { PageHome } from "components/common/PageHome";
import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import React, { lazy } from "react";
import client from "/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const query = groq`{
  'homePage':*[_type == "homePage"][0]  
{     
  title,
  subTitle,
  description,
  hero,  
  introText,
  promoVideo,
  latestNews,
  newsLinks {    
    _type,
    newsLinks[] {
      ...
      url->
    }
  },  
},
'events':*[_type == "event"]
{
  _id,
  title,
  excerpt,
  slug,
  featured_image,
  date,
  endDate,
  hideTime,
  allDay,
},

'ourWork':*[_type == "ourWorkShared"][0]
{  
  ourWork,
},
}
`;

const PreviewPage = lazy(() => import("components/PreviewPage"));

const HomePage = ({ data, preview }) => {
  // console.log("data here ", data);

  console.log("query here ", query);

  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPage query={query} />
    </PreviewSuspense>
  ) : (
    <PageHome data={data} />
  );
};

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"

  if (preview) {
    console.log(
      "preview homepag                                                                                                                                                                                                                                                                                                                                                    e ",
      preview
    );
    return { props: { preview } };
  }

  console.log("no preview");
  const data = await client.fetch(query, {});
  // console.log("events **********", data);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default HomePage;
