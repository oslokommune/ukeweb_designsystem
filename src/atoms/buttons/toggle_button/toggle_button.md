### General
This pattern is primarily to be used for switching between states.

The withIcon variant can for example also be used as a dropdown with active modifier when the dropdown is open.

### Data
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | [1] osg-v-default-icon  <br> [2] osg-v-with-icon | null | [1] Shows a button with a text <br> [2] Shows a button with a text and an icon on the right side |
| modifiers | String | [1] osg-m-main-menu <br> [2] osg-m-active <br> [3] osg-m-open | null | [1] Sets the color of the text in dark grey <br> [2] Adds a 5px light green border below <br> [3] Hides the text of the button and rotates the icon 90 degrees. You'll have to change the value of the attribute aria-expanded according to the status of the toggle |
| *text | String | (text value) | null | Text of the button |
| icon | String | [1]``` <i class='fa fa-chevron-down'></i>``` <br> [2]```<i class='osg-icon-filter'></i>``` | null | [1] Down arrow icon, uses Font Awesome library <br> [2] Filter arrow icon, uses and svg icon |
| dataattr | Array | key:String, val:String | null | Extra attributes to add to the button |

(*) mandatory

### Accessibility
To allow screen readers to read if the button is expanded or collapsed, dataattr must contain:

```json
 key: aria-expanded
 val: true|false
```
