### General

This is the main external header section containing the menu and navigate back button.

### Data Fields

| Attribute        | Type   | Values                                      | Default | Description                                          |
| ---------------- | ------ | ------------------------------------------- | ------- | ---------------------------------------------------- |
| modifiers        | String | Any global css class                        | null    | Root class to modify styles                          |
| title            | Object | text/url/title                              | null    | Link to this level/domain front page                 |
| title.text       | String | Clean text content                          | null    | Title elements text content                          |
| title.url        | String | Valid url                                   | null    | Url to where the title points                        |
| title.title      | String | Clean text content                          | null    | The title elements title attribute value             |
| parentLink       | Object | text/url/title                              | null    | Link to the global site front page                   |
| parentLink.text  | String | Clean text content                          | null    | parent link elements text content                    |
| parentLink.url   | String | Valid url                                   | null    | Url to where the parent link points                  |
| parentLink.title | String | Clean text content                          | null    | The parent link elements title attribute value       |
| \*navbarMenu     | Object | See the navbar_menu pattern for data fields | null    | Wrapper object for everything inside the opened menu |

(\*) mandatory

#### Utility classes

These optional utility classes should be added to the body tag, when needed.

| Name                      | Description                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| osg-u-header-overlay      | Will absolute position the header and overlay it with the page content. Used for positioning the header above the promo pattern. |
| osg-u-header-inverted     | Change color of header to white.                                                                                                 |
| osg-u-header-no-underline | Remove underline from header                                                                                                     |
