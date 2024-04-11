module.exports = {
    transform: {
      "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
  };
  