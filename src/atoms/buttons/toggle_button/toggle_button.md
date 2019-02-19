### General
This pattern is primarily to be used for switching between states.

The withIcon variant can for example also be used as a dropdown with active modifier when the dropdown is open.

### Data
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options bellow | osg-v-default | Name of the variant |
| modifiers | String | See modifier options bellow | null | Name of the modifier |
| *text | String | (text value) | null | Text of the button |
| icon | String | [1]``` <i class='fa fa-chevron-down'></i>``` <br> [2]```<i class='osg-icon-filter'></i>``` | null | [1] Down arrow icon, uses Font Awesome library <br> [2] Filter arrow icon, uses and svg icon |
| dataattr | Array | key:String, val:String | null | Extra attributes to add to the button |

(*) mandatory

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Shows a button with text |
| osg-v-with-icon | Shows a button with text and an icon on the right side |

### Modifier Options
| Name | Description |
|------|-------------|
| osg-m-main-menu | Sets the color of the text in dark grey |
| osg-m-active | Adds a 5px light green border below |
| osg-m-open | Hides the text of the button and rotates the icon 90 degrees. You'll have to change the value of the attribute aria-expanded according to the status of the toggle |

### Accessibility
To allow screen readers to read if the button is expanded or collapsed, dataattr must contain:

```json
 key: aria-expanded
 val: true|false
```
