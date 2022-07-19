module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ['react-native-reanimated/plugin',"module-resolver",
      {
        alias: {
          "@native-base/icons": "@native-base/icons/lib",
        },
      }
    ],
    presets: ['babel-preset-expo']
  };
};
