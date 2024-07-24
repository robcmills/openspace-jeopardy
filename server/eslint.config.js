import js from "@eslint/js";

export default [
  js.configs.all,
  {
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "warn",
    }
  }
];
