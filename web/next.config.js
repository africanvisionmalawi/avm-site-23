module.exports = {
  trailingSlash: true,
  webpack5: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    if (isServer) {
      require("./scripts/cache");
    }
    return config;
  },
};
