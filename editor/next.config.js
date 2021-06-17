const withTM = require("next-transpile-modules")([
  //
  "@boringso/react-core",
]);

module.exports = withTM({
  webpack: (config) => {
    return config;
  },
});
