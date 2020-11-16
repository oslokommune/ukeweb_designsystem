### General

This pattern is primarily to be used for previewing part of content basically an image, text and a link.

### Note on the link

If a the link variable is passed to this patterns twig the whole component will be a link. You can also choose to have a link inside the pattern instead by putting the markup for it inside the "content" block.

### Blocks

This pattern has one block named "content". Content passed to the block will render below the image and image caption.

### Examples

Example of clickable pattern with circular image, text on the left of the image on tablet and bigger resolutions, and with padding below the image on mobile.

[Codepen](https://codepen.io/oslokommune/pen/Gejwvv)

#### Twig include

```twig
{% embed 'organisms/navigation/hero/hero.twig' with {
  "hero": {
    "modifiers": "osg-hero--circle osg-hero--left-tablet",
    "link": {
      "url": "#",
      "title": "title"
    }
  },
  "shape": {
    "variant": "osg-v-image"
  },
  "figure": {
    "modifiers": "osg-u-padding-bottom-4-mobile-only",
    "caption": "Dolor sit amet",
    "img": {
      "alt": "Lorem ipsum dolor sit amet.",
      "defaultUrl": "https://picsum.photos/500/500/?random",
      "mediaQueryUrls": [
        {
          "query": "max-width: 768px",
          "url": "https://picsum.photos/300/300/?random"
        },
        {
          "query": "min-width: 769px",
          "url": "https://picsum.photos/500/500/?random"
        }
      ]
    }
  }
} only %}
  {% block content %}
    <h2 class='osg-u-heading-1'>
      Lorem ipsum
    </h2>
    <p class='osg-u-text-1'>
      Suspendisse condimentum suscipit arcu, eu porta ligula.
    </p>
  {% endblock %}
{% endembed %}
```

### Data Fields

| Attribute | Type   | Values                     | Default       | Description                    |
| --------- | ------ | -------------------------- | ------------- | ------------------------------ |
| variant   | String | See variant options below  | osg-v-default | Name of the variant            |
| modifiers | String | See modifier options below | null          | Name of the modifier           |
| link      | Object | *url, *title               | null          | Makes the story preview a link |

(\*) mandatory

### Variant Options

| Name          | Description                                        |
| ------------- | -------------------------------------------------- |
| osg-v-default | Is used if nothing is defined. Does nothing extra. |

### Modifier Options

| Name                            | Description                    |
| ------------------------------- | ------------------------------ |
| osg-hero--circle                | Makes the image circular       |
| osg-hero--left{-tablet-and-up}  | Text on the left of the image  |
| osg-hero--right{-tablet-and-up} | Text on the right of the image |
| osg-hero--top{-tablet-and-up}   | Text on the top of the image   |
| osg-hero--center-mobile-only    | Image and caption centered     |
