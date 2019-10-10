### General

This pattern is primarily a link with different designs and uses. Keep in mind that the text size affects to the size of the link.

### Blocks

This pattern has one block named "content". Content passed to the block will render inside the link.

More information about permitted content in links: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a</a>

### Examples

Here you can see the different uses of the variants and modifiers with links: <a href="https://codepen.io/oslokommune/pen/LaBKym" target="_blank">https://codepen.io/oslokommune/pen/LaBKym</a>.

### Data Fields

| Attribute | Type   | Values                                   | Default         | Description                                                        |
| --------- | ------ | ---------------------------------------- | --------------- | ------------------------------------------------------------------ |
| \*variant | String | See the "variant options" section below  | "osg-v-default" | Name of the variant                                                |
| modifiers | String | See the "modifier options" section below | null            | Root class to modify styles                                        |
| dataAttrs | Object | key and val                              | null            | See example in data tab                                            |
| url       | String | Valid url                                | '#'             | Value of the link's href attribute                                 |

(\*) mandatory

### Modifiers Options

| Name                    | Description                                  |
| ----------------------- | -------------------------------------------- |
| osg-link-button--circle | Changes the shape of the icon to be a circle |
| osg-button--outline     | Removes background-color. Keeps border.      |

### Color options

- "blue-dark"
- "green-dark"
- "green-light"
- "red"
- "yellow"

### Other attributes

If you want to set attributes, such as id, name, data targets etc. You can add them via the dataAttrs array which accepts key, val objects and adds them to the button or the anchor.
