### General
For displaying an important message.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | [1]osg-v-default<br>[2]osg-v-open | undefined | [1]Default variant<br>[2]When the alert is clicked and message displays in overlay |
| modifiers | String | Any global css class | null | Root class to modify styles |
| state | String | "default", "important", "critical" | "default" | Adds icon in the right corner. Exclamation mark for "important" and animated circle for "critical" |
| message | String | Clean text content | null | Text displayed in top left corner |
| updated.text | String | Clean text content | null | Text to be displayed before date |
| updated.date | String | Clean text content | null | Date of alert creation or updated |
| content | html | html content | null | Information the overlay when alert is clicked |

(*) mandatory
