module.exports = {
  sanity: {
    projectId:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "<#< sanity.projectId >#>",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "<#< sanity.dataset >#>",
    apiVersion: "2021-08-31",
  },
};
