// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import pageCategory from "./category";
import event from "./documents/event";
import homePage from "./documents/homePage";
import news from "./documents/news";
import ourWorkShared from "./documents/ourWorkShared";
import page from "./documents/page";
// import post from "./documents/post";
import shop from "./documents/shop";
import siteSettings from "./documents/siteSettings";
import bannerMsg from "./objects/bannerMsg";
import blockPortableText from "./objects/blockPortableText";
import bodyPortableText from "./objects/bodyPortableText";
import figure from "./objects/figure";
import googlemap from "./objects/googlemap";
import hero from "./objects/hero";
import homePageSection from "./objects/homePageSection";
import mainImage from "./objects/mainImage";
import newsLink from "./objects/newsLink";
import newsLinks from "./objects/newsLinks";
import newsPortableText from "./objects/newsPortableText";
import ourWorkItem from "./objects/ourWorkItem";
import ourWorkSelect from "./objects/ourWorkSelect";
import pageLinkPhoto from "./objects/pageLinkPhoto.js";
import pageLinks from "./objects/pageLinks.js";
import pdf from "./objects/pdfUpload";
import photoGallery from "./objects/photoGallery";
import richText from "./objects/richText";
import richTextSimple from "./objects/richTextSimple";
import shopTag from "./objects/shopTag";
import team from "./objects/team";
import teamMember from "./objects/teamMember";
import video from "./objects/video";
import videoGallery from "./objects/videoGallery";
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    pageCategory,
    shop,
    page,
    news,
    siteSettings,
    richText,
    richTextSimple,
    pageLinks,
    pageLinkPhoto,
    figure,
    hero,
    mainImage,
    video,
    videoGallery,
    photoGallery,
    bodyPortableText,
    blockPortableText,
    team,
    teamMember,
    ourWorkShared,
    ourWorkItem,
    homePage,
    ourWorkSelect,
    homePageSection,
    newsLink,
    newsLinks,
    newsPortableText,
    shopTag,
    event,
    googlemap,
    bannerMsg,
    pdf,
  ]),
});
