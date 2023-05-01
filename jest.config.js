module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|expo-status-bar|@testing-library/react-native|@react-native|react-native-easy-content-loader|expo-image-picker|expo-modules-core|expo-camera)/)',
  ],
  moduleNameMapper: {
    '^expo-camera$': '<rootDir>/__mocks__/expo-camera.js',
  },
};
