export default {
  widgets: [
    {
      name: "gatsby",
      options: { sites: [{ siteUrl: "https://preview-avmsite21.gtsb.io/" }] },
    },
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
            buildHookId: "5fb4f2339a862600a33f0435",
            name: "avm-staging-rf83vvlyprqh",
          },
        ],
      },
    },
  ],
};
