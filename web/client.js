// client.js
import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2023-01-01",
  useCdn: true, // `false` if you want to ensure fresh data
});

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = "production";
export const apiVersion = "2023-01-01";
