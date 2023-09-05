![Oslo Designsystem Banner](./src/assets/images/Facebook1.jpg)

<h1 align="center">Oslo Designsystem 🎨 🧑‍🎨</h1>

<div align="center">

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge&logo=rocket&label=Version)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=open-source-initiative&label=License)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=ffffff&label=JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vue](https://img.shields.io/badge/Vue-2.x-green?style=for-the-badge&logo=vue.js&label=Vue)](https://v2.vuejs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=ffffff&label=Sassy)](https://sass-lang.com/)

</div>

Welcome to `Oslo Designsystem` a complete library for styles and components used in Oslo Kommune.

## 📚 Table of Content

- **🎯 [Description](#description)**

- **🚀 [Installation](#installation)**
- **📑 [Documentation](#documentation)**
- **⚡ [Usage](#usage)**
- **🤝 [Contribution Guidelines](#contribution-guidelines)**
- **🆕 [Releasing new versions](#🆕-releasing-new-versions)**
- **📜 [License](#license)**
- **📬 [Contact](#contact)**

## 🎯 Description

`Oslo Designsystem` is a collection of reusable components, guided by clear standards. Designed with functionality, accessibility and aesthetic in mind, it serves as a unifying building block for all projects in Oslo Kommune

## Installation 🚀

```bash
npm install @oslokommune/oslo-designsystem
```

## 📑 Documentation

Please take a look at the [documentation](https://designsystem.oslo.kommune.no/#/getting_started-basics) if you want a complete understanding on how to use `Oslo Designsystem`

## ⚡ Usage

### Usage with webpack

### 1. Install the package

```bash
npm install @oslokommune/oslo-designsystem
```

### 2. Build tool

Install Webpack and its CLI.

```bash
npm install --save-dev webpack webpack-cli
```

### 3. Entry point

It is recommended to use `src/ods.scss` as the entry point as shown underneath

```js
// webpack.config.js
module.exports = {
  entry: './src/ods.scss',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
};
```

### 4. Implement components

Browse the Designsystem for components and add the code to your project.

### 5. Run the Build

You can now run

```bash
npx webpack
```

or add a script in your `package.json` to run Webpack.

### 6. Conflicts

Using other libraries could result in conflicting global styles.

## 🤝 Contribution

If you would like to contribute to this project, please take a look at our [contribute](https://designsystem.oslo.kommune.no/#/getting_started-contribute-basics) page for more information

## 🆕 Releasing new versions

<details>
  <summary><b>Releasing new versions</b></summary>

### Test

1. Merge pull request into test
2. Push test branch
3. CI/CD will make the test branch available at test.designsystem.ukeweb.io

### Production

1. Git pull
2. Update package.json with new version
3. Update CHANGELOG.md
4. Commit and push
5. Create new release at github.com with the same version as in package.json
6. CI/CD workflows will make new versioned CSS and font files available on CDN

## Icons

If used directly in stylesheet characters might change so you need to use map `content: map-get(icon-map.$icons, "chevron-right")`

### Generate Icon Font

1. Add/remove icon SVG/s in assets directory `/src/assets/icons`
2. Run icon build script `npm run build:icons`
3. New fonts, CSS & docs are automatically generated
4. Add new icons to general/icons/icons.html
5. Commit and carry on
</details>

## 📜 License

Oslo Designsystem is distributed under a MIT-license for open source code

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=open-source-initiative&label=Open%20Source)](https://opensource.org/licenses/MIT)

## 📬 Contact

Slack: beepbeepboopboop

devnull@uke.oslo.kommune.no

[Github - Oslo Designsystem](https://github.com/oslokommune/ukeweb_designsystem)

Made with ♥ by </br>
Team Devnull @ Utviklings- og kompetanseetaten
