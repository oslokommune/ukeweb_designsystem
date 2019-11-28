### General

This is the main header section containing the menu and navigate back button.

### Data Fields

| Attribute        | Type   | Values                                      | Default | Description                                          |
| ---------------- | ------- | ------------------------------------------- | ------- | ---------------------------------------------------- |
| modifiers        | String  | Any global css class                        | null    | Root class to modify styles                          |
| hasLogo          | Boolean | True or false                               | true    | Class to show logo in header                         |
| searchBar        | Object  | See the searchbar pattern for data fields   | null    | Wrapper object for searchbar                         |
| navbarMenu       | Object  | See the navbar_menu pattern for data fields | null    | Wrapper object for everything inside the opened menu |
| linkButton       | Object  | See the link_button pattern for data fields | null    | Wrapper object for link button                       |
| link             | Object  | Object consisting of title and url          | null    | Wrapper object for link                              |
| icon             | Object  | Object consisting of any icon-modifier      | user    | Object of icon modifier used in link                 |

#### Utility classes

These optional utility classes should be added to the body tag, when needed.

| Name                      | Description                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| osg-u-header-overlay      | Will absolute position the header and overlay it with the page content. Used for positioning the header above the promo pattern. |
| osg-u-header-inverted     | Change color of header to white.                                                                                                 |
| osg-u-header-no-underline | Remove underline from header                                                                                                     |
