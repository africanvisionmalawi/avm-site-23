import S from "@sanity/desk-tool/structure-builder";
import React from "react";
import {
  ImCogs,
  ImFilesEmpty,
  ImHome,
  ImNewspaper,
  ImOffice,
  ImTicket,
} from "react-icons/im";
import { MdShoppingCart } from "react-icons/md";
const sanityClient = require("@sanity/client");
const client = sanityClient({
  // TODO: replace this with env vars
  projectId: "hh4wbbfo",
  dataset: "production",
  apiVersion: "2019-01-29", // use current UTC date - see "specifying API version"!
  // token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

async function getCategorySlug(id) {
  const query = '*[_type == "pageCategory" && _id == $id] {title, slug}';
  const params = { id: id };
  try {
    const result = await client.fetch(query, params);
    if (result) {
      return result;
    }
  } catch (err) {
    console.log("error");
  }
}

// Simple example of web preview
const url = "https://preview-avmsite21.gtsb.io/";
let catSlug;
const WebPreview = ({ document }) => {
  const { displayed } = document;

  getCategorySlug(displayed.category._ref).then((res) => (catSlug = res));

  const category = catSlug ? catSlug[0].slug.current + "/" : "";
  const pathPrefix = category === "other" ? null : category;
  const path = `${pathPrefix}${
    document.indexPage ? "" : displayed.slug.current + "/"
  }`;
  console.log("path is  ", path);
  return <iframe src={url + path} frameBorder={0} height="100%" width="100%" />;
};

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(ImHome)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Pages by Category")
        .icon(ImFilesEmpty)
        .child(
          // List out the categories
          S.documentTypeList("pageCategory")
            .title("Pages by category")
            // When a category is selected, pass its id down to the next pane
            .child((pagecategoryId) =>
              // load a new document list
              S.documentList()
                .title("Pages")
                // Use a GROQ filter to get documents.
                // This filter checks for sampleProjects that has the
                // categoryId in its array of references
                .filter('_type == "page" && category._ref == $pagecategoryId')
                .params({ pagecategoryId })
            )
        ),
      S.listItem()
        .title("News")
        .icon(ImNewspaper)
        .child(
          S.documentList()
            .title("News")
            .defaultOrdering([{ field: "publishDate", direction: "desc" }])
            .filter('_type == "news"')
        ),
      S.listItem()
        .title("Events")
        .icon(ImTicket)
        .child(
          S.documentList()
            .title("Events")
            .defaultOrdering([{ field: "date", direction: "desc" }])
            .filter('_type == "event"')
        ),
      S.listItem()
        .title("Shop")
        .icon(MdShoppingCart)
        .child(
          // load a new document list
          S.documentList()
            .title("Shop")
            .defaultOrdering([{ field: "title", direction: "desc" }])
            .filter('_type == "shop"')
        ),

      S.listItem()
        .title("Our Work")
        .icon(ImOffice)
        .child(
          S.document().schemaType("ourWorkShared").documentId("ourWorkShared")
        ),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(ImCogs)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Page Categories")
        .child(
          S.documentList()
            .title("Page Categories")
            .defaultOrdering([{ field: "title", direction: "desc" }])
            .filter('_type == "pageCategory"')
        ),
      S.listItem()
        .title("All Pages")
        .child(
          S.documentList()
            .title("All Pages")
            .defaultOrdering([{ field: "title", direction: "desc" }])
            .filter('_type == "page"')
        ),
      S.listItem()
        .title("Unpublished changes")
        .child(
          S.documentList()
            .title("Pages with changes waiting to be published")
            .defaultOrdering([{ field: "title", direction: "desc" }])
            .filter(
              '(_type == "page" || _type == "event" || _type == "shop" || _type == "news" || _type == "ourWorkShared")  && count(*[_id in [^._id, "drafts." + ^._id]]) > 1'
            )
        ),
      // S.listItem()
      //   .title("Missing meta")
      //   .child(
      //     S.documentList()
      //       .title("Pages with no meta description")
      //       .defaultOrdering([{ field: "title", direction: "desc" }])
      //       .filter(
      //         '(_type == "page" || _type == "shop") && description == ""'
      //       )
      //   ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteSettings",
            "pages",
            "ourWorkShared",
            "homePage",
            "shop",
            "news",
            "event",
            "pageCategory",
            "page",
          ].includes(listItem.getId())
      ),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "page") {
    return S.document().views([
      S.view.form(),
      S.view.component(WebPreview).title("Web"),
    ]);
  }
};
