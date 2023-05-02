module.exports = function (config, options) {
  config.module.rules[0].exclude = /node_modules\/(?!@floating-ui)/;
  return config;
};
