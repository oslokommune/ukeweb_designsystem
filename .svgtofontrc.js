import path from 'path';

export default {
  fontName: 'OsloIcons2',
  css: {
    output: path.resolve(process.cwd(), 'src/system/'),
    fileName: '_icon-map2',
  },
  template: path.resolve(process.cwd(), 'src/utils/icon-map.scss.njk'),
  startUnicode: 0xea01,
  svgicons2svgfont: {
    fontHeight: 512,
    normalize: true,
  },
  website: false,
};
