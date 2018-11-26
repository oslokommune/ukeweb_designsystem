### General
Keep in mind that the text size affects to the size of the button.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String  | osg-v-default | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| state | String | See the color options section | "success" | Sets state colors for text and background using global css classes |
| *content | String | Clean text content | null | Text inside tag |
| dataattrs | Object | key and val | null | See example in data tab |

(*) mandatory

### State options
- "muted"
- "primary"
- "success"
- "warning"
- "danger"

### Links
The button accepts a link field in the json, this will make the button an <a> tag with the link as the href.

### Other attributes
If you want to set attributes, such as id, name, data targets etc. You can add them via the dataattrs array which accepts key, val objects and adds them to the <button> or <a>.
