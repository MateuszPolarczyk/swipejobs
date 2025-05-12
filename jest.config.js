const config = {
  preset: "react-native",
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!" +
      [
        "react-native",
        "react-navigation",
        "@react-navigation/.*",
        "expo",
        "expo-font",
        "expo-constants",
        "expo-modules-core",
        "@expo/vector-icons",
        "@react-native",
        "@expo/vector-icons/Feather",
      ].join("|") +
      ")/",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};

module.exports = config;
