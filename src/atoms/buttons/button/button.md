### General
This pattern is primarily a button with different designs and uses. Keep in mind that the text size affects to the size of the button.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | See "variant options" section below | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| color | String | See the color options section | "red" | Sets state colors for text and background using global css classes |
| content | String | Content of the button, it can be HTML as well | null | Content inside the button |
| text | String | Clean text content | null | Content inside the button |
| dataattrs | Object | key and val | null | See example in data tab |

(*) mandatory

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Default behaviour. |
| osg-v-toggle-icon |  Switches the icon between states. Also hides the text in mobile view |
| osg-v-circle | Makes the button a circle |

### Modifiers Options
| Name | Description |
|------|-------------|
| osg-m-open | Changes the icon when the state is open/expanded |

### Color options
- "blue-dark"
- "green-dark"
- "green-light"
- "red"
- "yellow"

### Other attributes
If you want to set attributes, such as id, name, data targets etc. You can add them via the dataattrs array which accepts key, val objects and adds them to the button or the anchor.

### Examples
Here you can see the different uses of the variants and modifiers with buttons: <a href="https://codepen.io/oslokommune/pen/WmxWXQ" target="_blank">https://codepen.io/oslokommune/pen/WmxWXQ</a>.
