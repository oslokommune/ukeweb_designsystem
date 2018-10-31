# Living style guidelines best practices

## Build optimizations
To make LSG work correctly with IE11 you have to intall the postcss webpack module and a polyfill for object-fit. This can be done by following the steps below:

### Step 1: Add dependencies to package.json
#### 1. Install postcss-loader and all required configuration modules as development dependencies.
`npm i --save-dev postcss-loader autoprefixer postcss-flexbugs-fixes cssnano postcss-object-fit-images`

This will process the CSS and add browser spesific styles.

#### 2. Install polyfill for IE11
`npm i --save object-fit-images`

### Step 2: Configure postcss-loader
Create a `postcss.config.js` file and add the following configuration elements to it:

```javascript
module.exports = ({ file, options, env }) => ({
  plugins: {
    'autoprefixer': {
      'browsers': [
        'last 2 versions',
        'not ie <= 10'
      ]
    },
    'postcss-flexbugs-fixes': {},
    'cssnano': {},
    'postcss-object-fit-images': {}
  }
})
```

### Step 3: Add postcss-loader to webpack
Add postcss-loader to your webpack configuration file

```javascript
{
  loader: 'postcss-loader'
}
```

### Step 4: Import and initialize the object-fit-images polyfill
Create a javascript file for initializing the polyfill

ES6 example:
```javascript
import objectFitImages from 'object-fit-images';

objectFitImages();
```

ES5 example:
```javascript
var objectFitImages = require('object-fit-images');

objectFitImages();
```

This file has to be included before the </body> tag in your project.

More documentation can be found here:
* postcss-loader: https://github.com/postcss/postcss-loader
* object-fit-images: https://www.npmjs.com/package/object-fit-images
* postcss-object-fit-images: https://github.com/ronik-design/postcss-object-fit-images


## CSS
### Colors
Colors should be part of the main palette, so please use the variables that you can find in src/sass/common_variables.sass. If you don't find the color you are looking for, make a new variable.
### Font sizes
Same as colors, we want to get track of the different font sizes the library has. In src/sass/common_variables.sass you can find all the sizes that are available.
The name of the variable contains the size of the font in pixels, and the value is its conversion to rem.

## Variant
A pattern can have different variants which shows different format for the same pattern.
Things to keep in mind when using variants:
+ The format of the variant file is: `nameOfPattern_variantName.json`, where `variantName` doesn't include the oka-v prefix.
+ One variant has to be set as default with the variant name **'oka-v-default'**. The default variant will merge its data with the other variants.
+ The value of the variant has to be prefixed with 'oka-v-', like the css classes.
+ The value of the variant will be included as a css class even thought it doesn't have any styles defined. The reason is to provide better DOM inspection on the consumer.
For example:
```json
//button_isCircle.json
{
  "button": {
    "content": "Bacon Ipsum",
    "variant": "oka-v-is-circle"
  }
}
```

```twig
{# button.twig #}
<div class="{{ button.variant }}">
```

## Modifiers
Modifiers are extension classes used for changing the style of a component.

Variants and modifiers differ in multiple ways:

### Variant:
+ A component can only use one variant at a time.
+ Usually consist of changes in visible elements and/or what data is displayed in the component.
+ Often include changes in variants used by sub components.

### Modifiers:
+ A component can have zero to multiple modifiers.
+ You can use multiple modifiers at a time
+ Only changes the styling of a component. Should not add/remove elements

An example usecase for a modifier could be for alternating the position of an element when using a component in a list. Lets say you have a component with a text block on the left side.
In your list you want this block to be displayed on the right side for every other compoenent. In this case you could make a modifier called `.oka-m-textblock-right` and append
this to all components that should have the textblock on the right side.

```json
//articleList.json
{
  "articleList": {
    "articles": [
      {
        "article": {
          "title": "Title of article",
          "content": "Article content",
          "variant": "oka-v-default",
          "modifiers": "",
          ...
        }
      },
      {
        "article": {
          "title": "Title of article",
          "content": "Article content",
          "variant": "oka-v-default",
          "modifiers": "oka-m-textbox-right",
          ...
        }
      }
      ...
    ]
  }
}
```

```twig
{# article.twig #}
<div class="{{ article.variant }} {{ article.modifiers | default(null) }}">
```

```twig
{# articleList.twig #}
...
<ul>
  {% for article in articleList.articles %}
    <li>
      {% include "organisms/../article.twig" with { article: article.article } %}
    </li>
  {% endfor %}
  </ul>
...
```

Things to keep in mind when using modifiers:
+ The naming convention for modifiers are `oka-m-modifierName`
+ Modifiers should only be used on the root element of a component
+ A pattern can have zero to many modifiers
+ The styling for a modifier is usually added to the sass file for that specific component.
+ Generic reusable modifiers could be added globally.
