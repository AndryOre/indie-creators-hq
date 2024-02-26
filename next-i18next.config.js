/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    localePath:
      typeof window === "undefined"
        ? /* eslint-disable-next-line @typescript-eslint/no-var-requires */
          require("path").resolve("./public/locales")
        : "/public/locales",
  },
};
