module.exports = {
  extends: [
    "@remix-run/eslint-config",
    // "@remix-run/eslint-config/jest-testing-library",
  ],
  ignorePatterns: ["./node_modules", "./**/node_modules/**", "./build", "./cache", "./public/build", "./public"],
};
