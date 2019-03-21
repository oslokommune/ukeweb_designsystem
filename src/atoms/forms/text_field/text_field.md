### General

Textfield for user input

### Data Fields

| Attribute     | Type   | Values                        | Default         | Description                                                        |
| ------------- | ------ | ----------------------------- | --------------- | ------------------------------------------------------------------ |
| \*variant     | String | osg-v-default                 | "osg-v-default" | Name of the variant                                                |
| modifiers     | String | See modifiers below           | null            | Root class to modify styles                                        |
| state         | String | See the color options section | null            | Sets state colors for text and background using global css classes |
| \*id          | String | Clean text content            | null            | input id attribute                                                 |
| \*placeholder | String | Clean text content            | null            | input placeholder attribute, and label text                        |
| \*name        | String | Clean text content            | null            | input name attribute                                               |

(\*) mandatory

### Variant Options

| Name                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| osg-v-default        | Is used if nothing is defined. Does nothing extra.  |
| osg-v-floating-label | Makes the label float above the text field on focus |

### Modifier Options

| Name                | Description                 |
| ------------------- | --------------------------- |
| osg-text-field--big | Makes the text field bigger |

### State options

- "muted"
- "primary"
- "success"
- "warning"
- "danger"
