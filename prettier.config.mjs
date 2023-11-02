/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
    "^@common/(.*)$",
    "^@components/(.*)$",
    "^@contexts/(.*)$",
    "^@hooks/(.*)$",
    "^@/utils/(.*)$",
    "^@storybook/(.*)$",
    "^@/styles/(.*)$",
    "",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export default config;
