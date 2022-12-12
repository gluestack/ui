/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  resolve: {
    "@gluestack/docs": path.resolve(__dirname, "../../"),
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1.0.x",
        permanent: true,
      },
    ];
  },
};

const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const { redirect } = require("next/dist/server/api-utils");
const withTM = require("next-transpile-modules")(["solito", "@gluestack/docs"]);

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);

// module.exports = () => {
//   const plugins = [withTM, withExpo];
//   return plugins.reduce((config, plugin) => plugin(config), nextConfig);
// };
