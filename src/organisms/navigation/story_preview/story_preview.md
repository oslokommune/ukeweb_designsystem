### General
This pattern is primarily to be used for previewing part of content basically an image, text and a link.

### Note on the link
This component can either have no link on it, have a link at the bottom or the whole component can be a link.
If no link is passed, either in the storyPreview object or the contentBox object and allClickable is not passed or set to false, the component will have no link.
If a link is passed to contentBox, there will be a link at the bottom of the component.
If a link is passed to storyPreview and allClickable is set to true, the whole component will be a link, the text at the bottom will be underlined on hover.


| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options below | osg-v-default | Name of the variant |
| modifiers | String | See modifier options below | null | Name of the modifier |
| link | Object | *url, *title | null | Makes the story preview a link |

(*) mandatory

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-circle | Figure is a circle |

### Modifier Options
| Name | Description |
|------|-------------|
| osg-story-preview--big{-tablet} | Makes the text bigger |
| osg-story-preview--left{-tablet} | Text on the left of the image |
| osg-story-preview--right{-tablet} | Text on the right of the image |
| osg-story-preview--top{-tablet} | Text on the top of the image |

### Examples

Example of clickable pattern with circular image, text on the left of the image on tablet and bigger resolutions, and with padding below the image on mobile.

[Codepen](https://codepen.io/oslokommune/pen/Gejwvv)

#### Twig include

```twig
{% embed 'organisms/navigation/story_preview/story_preview.twig' with {
  "storyPreview": {
    "modifiers": "osg-story-preview--left-tablet",
    "link": {
      "url": "#",
      "title": "title"
    },
    "variant": "osg-v-circle"
  },
  "shape": {
    "variant": "osg-v-circle osg-v-image"
  },
  "figure": {
    "modifiers": "osg-u-padding-bottom-medium-mobile-only",
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
