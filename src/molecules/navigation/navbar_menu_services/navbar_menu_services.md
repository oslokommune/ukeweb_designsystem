### General

The navbar menu services component displays horizontally a hamburger menu button and other custom content in tablet and desktop view. This custom content will be hidden in mobile view and show only a hamburger menu button.

The custom content have to be present within the opened menu in the mobile view.

Use the class "osg-menu\_\_content" to hide the custom content in mobile view.

### Blocks

The blocks are the following:

- menuButtonContent: to override the content of the navbar menu services button.
- menuOtherLinks: to add custom links or buttons in the navbar menu services.
- menuListExpanded: to add the content of the expanded part of the navbar menu services.

### Data Fields

| Attribute | Type   | Values               | Default | Description                                                                                              |
| --------- | ------ | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| modifiers | String | Any global css class | null    | Root class to modify styles.                                                                             |
| text      | String | Clean text content   | null    | Text of the hamburger button. This will be hidden in mobile view and visible in tablet and desktop view. It is always available to screen readers. |
| textClose | String | Clean text content   | null    | Text of the close button. This is hidden in all devices, but available to screen readers.                                               |

### Modifier Options

| Name           | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| osg-menu--open | Expanded state for menu. The hamburger button transforms into a close button. |

### Accessibility

Ensure that the hamburger button has a text. This is necessary so the screen readers can find the button.
Only one of the data fields text and textClose should be available for screen readers at a time, so you will need to use aria-hidden to hide each one depending on the case:
when the menu is open, set the data field 'text' aria-hidden=true and 'textClose' aria-hidden=false and the opposite when the menu is closed.
