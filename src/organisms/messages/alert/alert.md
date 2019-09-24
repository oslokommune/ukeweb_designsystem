### General

For displaying an important message. The Alert acts as a button that will open a modal when clicked.

### Examples

See a html example of a opened alert on Codepen [here](https://codepen.io/oslokommune/pen/BbRmmj)

### Blocks

- content: html to go in the part that is always visible.
- closeButtonContent: html content to go in the close button of the opened alert. Has a cross icon from font awesome with a sr-only text by default. Information about permitted content in buttons: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button</a>
- message: html content to go in the opened message box.

### Data Fields

| Attribute           | Type   | Values                             | Default   | Description                                                                                        |
| ------------------- | ------ | ---------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| modifiers           | String | See modifiers below                | null      | Root class to modify styles                                                                        |
| state               | String | "default", "important", "critical" | "default" | Adds icon in the right corner. Exclamation mark for "important" and animated circle for "critical" |
| \*buttonAriaLabel   | String | Clean text content                 | undefined | ARIA-Label of the button that opens the modal                                                      |
| \*closeButtonSrText | String | Clean text content                 | undefined | Close button text available to screen readers                                                      |

### Modifier Options

| Name            | Description                                       |
| --------------- | ------------------------------------------------- |
| osg-alert--open | Opens the alert, making the message block visible |

(\*) mandatory

### Javascript

On click of the alert this pattern needs javascript to toggle

- the modifier "osg-alert--open"
- true/false on aria-expanded

Javascript is also needed to change focus for screen readers on opening and closing the modal.
