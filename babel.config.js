module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['@babel/plugin-proposal-private-methods', { 'loose': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      ['@babel/plugin-proposal-private-property-in-object', { 'loose': true }],
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
