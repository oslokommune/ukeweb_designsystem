### General
For displaying an important message. The Alert acts as a button that will open a modal when clicked.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | [1]osg-v-default<br>[2]osg-v-open | undefined | [1]Default variant<br>[2]When the alert is clicked and message displays in overlay |
| modifiers | String | Any global css class | null | Root class to modify styles |
| state | String | "default", "important", "critical" | "default" | Adds icon in the right corner. Exclamation mark for "important" and animated circle for "critical" |
| *ariaLabel | String | Clean text content | "Viktig melding" | ARIA-Label of the button that opens the modal |
| message | String | Clean text content | null | Text displayed in top left corner |
| updated.text | String | Clean text content | null | Text to be displayed before date |
| updated.date | String | Clean text content | null | Date of alert creation or updated |
| content | html | html content | null | Information the overlay when alert is clicked |

(*) mandatory

### Javascript
On click of the alert this pattern needs javascript to toggle
* the modifier "osg-alert--open"
* true/false on aria-expanded

Javascript is also needed to change focus for screen readers on opening and closing the modal.
