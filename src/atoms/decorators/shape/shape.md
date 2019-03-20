### General

Shape that scales with content. Is shaped like a square by default, but can have different shapes triggered by variant classes.

If used for displaying text it should not contain a lot of content, but rather small data points like tags.

Shape can be a link as well, you just need to fill the optional attribute "url". By default this link will open in a new window.

### Data Fields

| Attribute | Type   | Values                    | Default         | Description                   |
| --------- | ------ | ------------------------- | --------------- | ----------------------------- |
| variant   | String | See variant options below | "osg-v-default" | Name of the variant           |
| \*text    | String | Clean text content        | null            | Text inside shape             |
| \*url     | String | Valid url                 | null            | Url to where the shape points |

(\*) mandatory

### Variant Options

| Name          | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| osg-v-default | Is used if nothing is defined. Does nothing extra.                                     |
| osg-v-image   | Use together with figure data fields to create a shape image                           |
| osg-v-circle  | Makes the shape circular. Can be combined with the image variant to get a circle image |

## Note

You can combine the the image and the circle variants to get a circle image.
