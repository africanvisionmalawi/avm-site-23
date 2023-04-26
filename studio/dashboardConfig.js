export default {
  widgets: [
    {
      name: "snipcart-orders",
      options: {
        apiKey: process.env.SANITY_STUDIO_SNIPCART_SECRET,
      },
    },
    {
      name: "netlify",
      options: {
        title: "My Netlify deploys",
        sites: [
          {
            title: "www.africanvision.org.uk",
            apiId: "f6e1ff52-323f-4c7f-b2a7-c1980c9d7051",
            buildHookId: "64490b345f60f15a42256a9a",
            name: "avm-staging-rf83vvlyprqh",
          },
        ],
      },
    },
  ],
};
