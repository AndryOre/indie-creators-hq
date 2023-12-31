import nextI18NextConfig from "./next-i18next.config.js";

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
};

export default config;
