/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  bracketSpacing: true,
};
