### General
This pattern is used for displaying the intro section on a page.

### Blocks
This pattern has one block named "content". Content passed to the block will render centered on top of the image. If you are using twig and just want to add a clean text string with the default styling, you can pass in your string to the "title" data field.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options below | osg-v-default | Name of the variant |
| title | String | Clean text content | null | Text on top of image |

**See the figure patterns data fields to know how to add a logo.**

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
