// ./src/lib/sanity.preview.ts

import { definePreview } from "next-sanity/preview";
import { dataset, projectId } from "/client";

// console.log("dataset ", dataset);
// console.log("projectId ", projectId);

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`);
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});
