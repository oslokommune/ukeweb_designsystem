### General
For displaying an important message. The Alert acts as a button that will open a modal when clicked.

### Examples
See a html example of a opened alert on Codepen [here](https://codepen.io/oslokommune/pen/BbRmmj)

### Blocks
* content: html to go in the part that is always visible.
* closeButtonContent: html content to go in the close button of the opened alert. Has a cross icon from font awesome with a sr-only text by default.
* message: html content to go in the opened message box.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | [1]osg-v-default<br>[2]osg-v-open | undefined | [1]Default variant<br>[2]When the alert is clicked and message displays in overlay |
| modifiers | String | Any global css class | null | Root class to modify styles |
| state | String | "default", "important", "critical" | "default" | Adds icon in the right corner. Exclamation mark for "important" and animated circle for "critical" |
| *ariaLabel | String | Clean text content | "Viktig melding" | ARIA-Label of the button that opens the modal |

(*) mandatory

### Javascript
On click of the alert this pattern needs javascript to toggle
* the modifier "osg-alert--open"
* true/false on aria-expanded

Javascript is also needed to change focus for screen readers on opening and closing the modal.
