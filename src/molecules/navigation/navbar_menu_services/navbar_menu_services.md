### General

The navbar menu services component displays a hamburger menu button and other custom content in tablet and desktop view. This custom content can be for example, links or buttons and they will be hidden in mobile view, which will show only a hamburger menu button.

When the menu is expanded, the custom content should be present within the expanded content only in the mobile view. The expanded menu can have an overlay background if the content is very large, see "Modifiers options" further down.

Use the class "osg-other-links" to hide the custom content in mobile view.

### Blocks

The blocks are the following:

- menuButtonContent: to override the content of the navbar menu services button.
- menuOtherLinks: to add custom links or buttons in the navbar menu services.
- menuListExpanded: to add the content of the expanded part of the navbar menu services.

### Data Fields

| Attribute | Type   | Values               | Default | Description                                                                                                                                        |
| --------- | ------ | -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| modifiers | String | Any global css class | null    | Root class to modify styles.                                                                                                                       |
| text      | String | Clean text content   | null    | Text of the hamburger button. This will be hidden in mobile view and visible in tablet and desktop view. It is always available to screen readers. |
| textClose | String | Clean text content   | null    | Text of the close button. This is hidden in all devices, but available to screen readers.                                                          |

### Modifier Options

| Name               | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| osg-navbar-menu-services--expanded | Expanded state for menu. The hamburger button transforms into a close button.           |
| osg-navbar-menu-services--overlay  | Shows dark overlay when the menu is expanded. Only applies to tablet and desktop views. |

### Accessibility

Ensure that the hamburger button has a text. This is necessary so the screen readers can find the button.
Only one of the data fields text and textClose should be available for screen readers at a time, so you will need to use aria-hidden to hide each one depending on the case:
when the menu is expanded, set the data field 'text' to aria-hidden=true and 'textClose' aria-hidden=false and the opposite when the menu is collapsed.
Also you need to toggle the aria-expanded attribute when the menu is expanded.

### Examples

Here you can see an example on how the navbar menu services works: <a href="https://codepen.io/oslokommune/pen/rNBMBQr" target="_blank">https://codepen.io/oslokommune/pen/rNBMBQr</a>.
