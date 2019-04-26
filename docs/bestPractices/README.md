# Styleguide Development Best Practices

## CSS

### Colors

Colors should be part of the main palette, so please use the variables that you can find in src/sass/common_variables.sass. If you don't find the color you are looking for, make a new variable.

### Font sizes

Same as colors, we want to get track of the different font sizes the library has. In src/sass/common_variables.sass you can find all the sizes that are available.
The name of the variable contains the size of the font in pixels, and the value is its conversion to rem.

## Variant

A pattern can have different variants which shows different format for the same pattern. It can have both different markup and styling.
Things to keep in mind when using variants:

- The format of the variant file is: `name_of_pattern-variant_name.json`.
- You do not specify the variant for the pattern in the default pattern json file. It will be set to 'osg-v-default' in the twig when it is not defined in the json file.
- The default variant json data will merge its data with the other variants.
- The value of the variant has to be prefixed with 'osg-v-', like the css classes.
- The value of the variant will be included as a css class even if it doesn't have any styles defined. The reason is to provide better DOM inspection on the consumer.
  For example:

```json
//button_isCircle.json
{
  "button": {
    "content": "Lorem ipsum",
    "variant": "osg-v-circle"
  }
}
```

```twig
{# button.twig #}
<div class="{{ button.variant | default('osg-v-default')  }}">
```

## Modifiers

Modifiers are extension classes used for changing the style of a component.

Variants and modifiers differ in multiple ways:

### Variant:

- A component can only use one variant at a time.
- Usually consist of changes in visible elements and/or what data is displayed in the component.
- Often include changes in variants used by sub components.

### Modifiers:

- A component can have zero to multiple modifiers.
- Only changes the styling of a component. Should not add/remove elements

An example usecase for a modifier could be for alternating the position of an element when using a component in a list. Lets say you have a component with a text block on the left side.
In your list you want this block to be displayed on the right side for every other compoenent. In this case you could make a modifier called `.osg-article-list--textblock-right` and append
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
          "variant": "osg-v-default",
          "modifiers": "",
          ...
        }
      },
      {
        "article": {
          "title": "Title of article",
          "content": "Article content",
          "variant": "osg-v-default",
          "modifiers": "osg-article-list--textbox-right",
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
<div class="{{ article.variant | default('osg-v-default')  }} {{ article.modifiers | default(null) }}">
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

- The naming convention for modifiers are `osg-pattern-name--modifier-name`
- Modifiers should only be used on the root element of a component
- A pattern can have zero to many modifiers
- The styling for a modifier is usually added to the sass file for that specific component.
- Generic reusable modifiers could be added globally.
