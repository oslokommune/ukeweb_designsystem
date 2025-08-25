// .fantasticonrc.js
const path = require('path');
const root = __dirname;

module.exports = {
  inputDir: path.join(root, 'src/assets/icons'),      // directory, not a glob
  outputDir: path.join(root, 'src/assets/fonts'),

  name: 'OsloIcons',
  fontHeight: 512,
  normalize: true,

  fontTypes: ['eot', 'ttf', 'woff', 'woff2'],
  assetTypes: ['scss'],

  pathOptions: {
    scss: path.join(root, 'src/system/_icon-map.scss')
  },

  templates: {
    scss: path.join(root, 'src/utils/_icon-map.scss.hbs')
  }
};
