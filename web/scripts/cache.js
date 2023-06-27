const fs = require("fs");
const groq = require("groq");
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
  indexPage,
  "categoryTitle": category->title, 
  "categorySlug": category->slug.current,
}`;

async function getPages() {
  const data = await client.fetch(query);

  const pages = data.map((page) => {
    const urlBase = page.categorySlug ? `/${page.categorySlug}` : "/";
    const slug = page.slug?.current ? `/${page.slug.current}` : "";
    return {
      id: page._id,
      title: page.title,
      path: page.indexPage ? `${urlBase}/` : `${urlBase}${slug}/`,
    };
  });
  return JSON.stringify(pages);
}

async function writePages() {
  const allPages = await getPages();
  const fileContents = `export const pages = ${allPages}`; // here we created the contents of the cache file

  // if cache directory exists, ok else create it
  try {
    fs.readdirSync("cache");
  } catch (e) {
    fs.mkdirSync("cache");
  }

  // writing to the cache/data.js file
  fs.writeFile("cache/data.js", fileContents, function(err) {
    if (err) return console.log(err);
    console.log("Page data cached.");
  });
}

writePages();
