### General

Shape that scales with content. Is shaped like a square by default, but can have different shapes triggered by variant classes.

You can use pass a clean text string to the variable "text", or extend the block "content" with whatever twig content you like.

You can also choose to shape an image by passing in the "osg-v-image" variant and the image data to the figure object.

Shape can be a link as well, you just need to fill the optional attribute "url". By default this link will open in a new window.

### Blocks

- "content": Content passed to the block will render inside the shape.
- "figureContent": Content passed to the block will render (if image variant is in use) inside the figure element, below the image.

### Examples
Here you can see the different uses of the variants and modifiers with buttons: <a href="https://codepen.io/oslokommune/pen/vMOEma" target="_blank">https://codepen.io/oslokommune/pen/vMOEma</a>

### Data Fields

| Attribute | Type   | Values                    | Default         | Description                   |
| --------- | ------ | ------------------------- | --------------- | ----------------------------- |
| variant   | String | See variant options below | "osg-v-default" | Name of the variant           |
| \*text    | String | Clean text content        | null            | Text inside shape             |
| url       | String | Valid url                 | null            | Url to where the shape points |

(\*) mandatory

### Variant Options

| Name          | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| osg-v-default | Is used if nothing is defined. Does nothing extra.                                     |
| osg-v-image   | Use together with figure data fields to create a shape image                           |
| osg-v-circle  | Makes the shape circular. Can be combined with the image variant to get a circle image |

## Note

You can combine the the image and the circle variants to get a circle image.
