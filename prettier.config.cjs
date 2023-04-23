/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 100,
  useTabs: false,
};

module.exports = config;
