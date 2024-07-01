module.exports = {
  images: {
    domains: ["cdn.sanity.io"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.sanity.io",
    //     port: "",
    //     pathname: "/images/hh4wbbfo/production/",
    //   },
    // ],
  },
  trailingSlash: false,
  webpack5: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    if (isServer) {
      require("./scripts/cache");
    }
    return config;
  },
};
