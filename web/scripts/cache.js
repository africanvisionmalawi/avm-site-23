const fs = require("fs");
const groq = require("groq");
// const client = require("/client.js");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2023-01-01",
  useCdn: true, // `false` if you want to ensure fresh data
});

const query = groq`*[_type == "page"] {     
  slug, 
  _id,
  title,  
  "categoryTitle": category->title, 
  "categorySlug": category->slug.current,
}`;

async function getPages() {
  const data = await client.fetch(query);

  const pages = data.map((page) => {
    return {
      id: page._id,
      title: page.title,
      slug: page.slug,
      categorySlug: page.categorySlug,
    };
  });
  console.log("pages ", pages);
  return JSON.stringify(pages);
}
const allPages = getPages();
const fileContents = `export const pages = ${allPages}`; // here we created the contents of the cache file

try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}
// if cache directory exists, ok else create it

fs.writeFile("cache/data.js", fileContents, function(err) {
  // writing to the cache/data.js file
  if (err) return console.log(err);
  console.log("Pages cached.");
});
