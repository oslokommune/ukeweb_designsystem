### General
For displaying an important message.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | [1]osg-v-default, [2]osg-v-large | undefined | [1]Default variant, [2]Example of how to the alert more expansive |
| modifiers | String | Any global css class | null | Root class to modify styles |
| state | String | See the color options section | "success" | Sets state colors for text and background using global css classes |
| message | String | Clean text content | null | Text displayed in top left corner |
| updated.text | String | Clean text content | null | Text to be displayed before date |
| updated.date | String | Clean text content | null | Date to be displayed in top right corner |
| content | html | html content | null | Used to display additional information. Will be parsed as html. |

(*) mandatory

### State options
- "muted"
- "primary"
- "success"
- "warning"
- "danger"
