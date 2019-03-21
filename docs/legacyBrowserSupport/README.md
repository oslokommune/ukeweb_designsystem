# Legacy browser support

To make the Styleguide work correctly with IE11 you have to intall the postcss webpack module and a polyfill for object-fit. This can be done by following the steps below:

## Step 1: Add dependencies to package.json

### 1. Install postcss-loader and all required configuration modules as development dependencies.

`npm i --save-dev postcss-loader autoprefixer postcss-flexbugs-fixes cssnano postcss-object-fit-images`

This will process the CSS and add browser spesific styles.

### 2. Install polyfill for IE11

`npm i --save object-fit-images`

## Step 2: Configure postcss-loader


Create a `postcss.config.js` file and add the following configuration elements to it:

```javascript
module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: {
      browsers: ["last 2 versions", "not ie <= 10"]
    },
    "postcss-flexbugs-fixes": {},
    cssnano: {},
    "postcss-object-fit-images": {}
  }
});
```

## Step 3: Add postcss-loader to webpack

Add postcss-loader to your webpack configuration file

```javascript
{
  loader: "postcss-loader";
}
```

## Step 4: Import and initialize the object-fit-images polyfill

Create a javascript file for initializing the polyfill

ES6 example:

```javascript
import objectFitImages from "object-fit-images";

objectFitImages();
```

ES5 example:

```javascript
var objectFitImages = require("object-fit-images");

objectFitImages();
```

This file has to be included before the </body> tag in your project.

More documentation can be found here:

- postcss-loader: https://github.com/postcss/postcss-loader
- object-fit-images: https://www.npmjs.com/package/object-fit-images
- postcss-object-fit-images: https://github.com/ronik-design/postcss-object-fit-images
