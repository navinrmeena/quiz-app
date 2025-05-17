const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add alias for your 'app' folder (adjust path if your app folder is elsewhere)
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    app: path.resolve(__dirname, "app")
  };

  return config;
};
