### General

Menu list shows a list of links that can be expandable / collapsible in mobile view.

### Examples

Here you can see the different uses of modifiers in this pattern: <a href="https://codepen.io/oslokommune/pen/yWeaye" target="_blank">https://codepen.io/oslokommune/pen/yWeaye</a>.

### Data Fields

| Attribute | Type   | Values               | Default | Description                                 |
| --------- | ------ | -------------------- | ------- | ------------------------------------------- |
| modifiers | String | Any global css class | null    | Root class to modify styles                 |
| heading   | String | Clean text content   | null    | Text to be displayed as heading of the link |
| \*url     | String | Valid url            | null    | Url to where the link points                |
| dataAttrs | Object | key and val          | null    | See example in data tab                     |

(\*) mandatory

### Modifier Options

| Name                                    | Description                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------- |
| osg-menu-list--expandable               | Adds the plus icon and hides the menu items                                 |
| osg-menu-list--expandable-mobile-only   | Adds the plus icon and hides the menu items only for mobile screens         |
| osg-menu-list--expandable-tablet-and-up | Adds the plus icon and hides the menu items for tablets and bigger screens  |
| osg-menu-list--expanded                 | Adds the minus icon and shows the menu items                                |
| osg-menu-list--vertical                 | Displays the list of items in one column and reduces the space between them |

### Accessibility

There are several things to have in mind when the menu expands and collapses:

| Element                           | Description                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| button                            | aria-expanded="true" when the content is visible and false when is not. Also aria-hidden true when the header visible and false otherwise |
| h3                                | aria-hidden="false" when the button is visible and true otherwise                                                                         |
| ul class="osg-menu-list__content" | aria-hidden="false" when the button is aria-expanded="true" and false otherwise                                                           |
