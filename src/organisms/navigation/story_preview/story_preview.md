### General
This pattern is primarily to be used for previewing part of content basically an image, text and a link.

### Note on the link
This component can either have no link on it, have a link at the bottom or the whole component can be a link.
If no link is passed, either in the storyPreview object or the contentBox object and allClickable is not passed or set to false, the component will have no link.
If a link is passed to contentBox, there will be a link at the bottom of the component.
If a link is passed to storyPreview and allClickable is set to true, the whole component will be a link, the text at the bottom will be underlined on hover.


| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options bellow | osg-v-default | Name of the variant |
| modifiers | String | See modifier options bellow | null | Name of the modifier |
| allClickable | boolean | true, false | null | Makes the story preview a link, link must be passed in for this to work |
| link | Object | url, text, srText | null | Link for the component, does nothing if allClickable is not true |

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-circle | Figure is a circle |

### Modifier Options
| Name | Description |
|------|-------------|
| osg-m-big{-tablet} | makes the text bigger |
| osg-m-left{-tablet} | text on the left of the image |
| osg-m-right{-tablet} | text on the right of the image |
| osg-m-top{-tablet} | text on the top of the image |
