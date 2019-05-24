### General

Icon link shows an icon at the left side and a text on the right side. The text can have a heading and a description or only one of them. The icon is optional, and can be added using a block or using the style guide css icons.

### Blocks

This pattern has one block named "content". Content passed to the block will render in the icon's side.

### Examples

Here you can see the different uses of the variants and modifiers with buttons: <a href="https://codepen.io/oslokommune/pen/rgjrVm" target="_blank">https://codepen.io/oslokommune/pen/rgjrVm</a>.

### Data Fields

| Attribute | Type   | Values               | Default | Description                                 |
| --------- | ------ | -------------------- | ------- | ------------------------------------------- |
| modifiers | String | Any global css class | null    | Root class to modify styles                 |
| heading   | String | Clean text content   | null    | Text to be displayed as heading of the link |
| \*url     | String | Valid url            | null    | Url to where the link points                |
| dataAttrs | Object | key and val          | null    | See example in data tab                     |

(\*) mandatory
