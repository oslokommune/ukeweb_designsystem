### General

Pattern giving more attention to an otherwise small piece of content.

### Blocks

This pattern has one block named "content". Content passed to the block will render vertically centered inside the first squared box.

### Examples

See a html example with search [here](https://codepen.io/oslokommune/pen/zbLXbV)

### Data Fields

| Attribute    | Type   | Values                              | Default         | Description                                                                                        |
| ------------ | ------ | ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| variant      | String | See "variant options" section below | "osg-v-default" | Name of the variant                                                                                |
| modifiers    | String | Any global css class                | null            | Root class to modify styles                                                                        |
| \*imageShape | Object | See shape hero docs for details     | null            | Second big box                                                                                     |
| circleShape  | Object | See shape hero docs for details     | null            | Circle on top of second big big box. Not used in the osg-v-circle variant                          |
| bgColor      | String | Any valid Oslo color                | null            | If this pattern is placed on a background with another color than white, then pass this color here |

(\*mandatory)

_If you want to alter the first big box, pass in shape data to an object named shape. See the shape pattern for shape data field options_

example data:

```json
{
  "shapeHero": { ... },
  "shape": {
    "modifiers": "osg-u-color-bg-red"
  }
}
```

### Variant Options

| Name          | Description                                        |
| ------------- | -------------------------------------------------- |
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-circle  | Will make the second big box circular              |

### Coloring

You can the different parts of this pattern.

To color the first big box pass in a background color util class to shape.modifiers.

To color the second big box pass in a background color util class to shapeHero.imageShape.modifiers.

To color the circle inside on top of the second big box pass in a background color util class to shapeHero.circleShape.modifiers.

To change the color behind the circle on top of the second big box pass in a color name to shapeHero.bgColor. This is to be used if you place the shape hero pattern on top a background that has another color than white.
