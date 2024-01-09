// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig, mergeConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support.
  isCSSEnabled: true,
});

config.transformer.getTransformOptions =  async () => ({
  transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
  },
});

config.resolver.sourceExts.push('mjs');
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'glb',
  'gltf',
  'png',
  'jpg',
);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */


module.exports = config;
