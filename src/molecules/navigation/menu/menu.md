### General

The menu component displays horizontally a hamburger menu button and other custom content in tablet and desktop view. This custom content will be hidden in mobile view and show only a hamburger menu button.

The the custom content have to be present within the opened menu in the mobile view.

Use the class "osg-menu\_\_content" to hide the custom content in mobile view.

### Blocks

The blocks are the following:

- menuButtonContent: to override the content of the menu button.
- menuOtherContent: to add custom links or buttons in the menu.

### Data Fields

| Attribute | Type   | Values               | Default | Description                                                                                              |
| --------- | ------ | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| modifiers | String | Any global css class | null    | Root class to modify styles.                                                                             |
| text      | String | Clean text content   | null    | Text of the hamburger button. This will be hidden in mobile view and visible in tablet and desktop view. |
| textClose | String | Clean text content   | null    | Text of the close button. This will be hidden                                                            |

### Modifier Options

| Name           | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| osg-menu--open | Expanded state for menu. The hamburger buttons transforms into a close button |

### Accessibility

Ensure that the hamburger button has a text. This is necessary so the screen readers can find the button.
