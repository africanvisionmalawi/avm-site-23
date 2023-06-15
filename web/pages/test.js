import imageUrlBuilder from "@sanity/image-url";
import { PageIndex } from "components/homepage/PageIndex";
import groq from "groq";
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

const PreviewPageIndex = lazy(() =>
  import("components/homepage/PreviewPageIndex")
);

const HomePage = ({ data, preview, token }) => {
  // console.log("data here ", data);

  // console.log("query here ", query);

  // console.log("token here is ", token);

  return <PageIndex data={data} />;
};

export async function getStaticProps({ preview = false, previewData = {} }) {
  // It's important to default the slug so that it doesn't return "undefined"
  // console.log("previewData ", previewData);

  if (preview && previewData?.token) {
    // console.log(
    //   "preview homepag                                                                                                                                                                                                                                                                                                                                                    e ",
    //   preview
    // );
    return { props: { preview, token: previewData.token } };
  }

  // console.log("no preview");
  const data = await client.fetch(query, {});
  // console.log("events **********", data);

  return {
    props: {
      data,
      preview,
    },
  };
}

export default HomePage;
