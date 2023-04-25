module.exports = {
  trailingSlash: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };

    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: "/avm-studio",
          destination: "https://avm.sanity.studio/desk/",
        },
      ],
    };
  },
};
