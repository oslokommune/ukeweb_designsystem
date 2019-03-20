### General

List of icons and data used to display information

### Blocks

This pattern has one block named "content". Content passed to the block will render inside the box after the list.

### Data Fields

| Attribute    | Type   | Values                                                           | Default | Description                                 |
| ------------ | ------ | ---------------------------------------------------------------- | ------- | ------------------------------------------- |
| modifiers    | String | Any global css class                                             | null    | Root class to modify styles                 |
| asteriskText | String | Clean text content                                               | null    | Text to be displayed after the list of data |
| \*entries    | Object | Array of icons with data                                         | null    | A container for the icons array             |
| \*icons      | Array  | List of objects. See the "Icon Object Data Fields" section below | null    | Array of icon objects                       |

#### Icon Object Data Fields

| Attribute | Type   | Values             | Default | Description                                    |
| --------- | ------ | ------------------ | ------- | ---------------------------------------------- |
| \*variant | String | Clean text content | null    | Variant name to pass to the icon atom          |
| text      | String | Rich text (html)   | null    | Text content to display together with the icon |
| link      | String | Valid url          | null    | Url for a link displayed together with icon    |
| linkText  | String | Clean text content | null    | Text for the link                              |

(\*) mandatory
