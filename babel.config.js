module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            'expo-image-picker': 'expo-image-picker/build/ImagePicker',
          },
        },
      ],
    ],
  };
};
