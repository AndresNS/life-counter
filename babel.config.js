module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@app": "./app",
            "@common": "./src/common",
            "@constants": "./src/constants",
            "@features": "./src/features",
            "@store": "./src/store",
          },
        },
      ],
    ],
  };
};
