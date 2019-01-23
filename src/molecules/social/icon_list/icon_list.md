### General
This pattern is for displaying a horizontal and vertical line of font awesome brand icons mainly for the use of SoMe share functionality.
The icons must always contain text, toggled by the flag "textVisible" set to true or false depending on if the text has to be visible or if it has to be readable only for screen readers.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String  | See "variant options" section below | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| *brands | Array | List of objects. See the "Brands Object Data Fields" section below | null | Array of icon objects |

#### Brands Object Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *icon | String | Rich text (html) | null | html element of the icon to display |
| text | String | Clean text content | null | Text displayed together with the icon and/or in the anchor elements title attribute |
| textVisible | Boolean | true/false | null | Whether to display the text below the icon |
| *url | String | Valid url | null | Url to where the icon points |

(*) mandatory

### Variant Options
| Name | Description |
|---|---|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-vertical | Display the icons vertically inside circle shapes |
| osg-v-vertical-no-shape | Display the icons vertically with text |
