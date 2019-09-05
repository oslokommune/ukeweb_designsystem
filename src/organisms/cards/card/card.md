### General

Multi-purpose container for previewing part of content, usually some form of article.

### Blocks

This pattern has two blocks, one named "content" and one named "extraContent". Content passed to the block will render inside the content box. Content passed to the extraContent block will be in a div under the card, which is outside of the anchor tag of the card, but will appear as though it is inside the card.

### Data Fields

| Attribute       | Type   | Values                              | Default         | Description                                                                                                                                                                                              |
| --------------- | ------ | ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant         | String | See "variant options" section below | "osg-v-default" | Name of the variant                                                                                                                                                                                      |
| modifiers       | String | Any global css class                | null            | Root class to modify styles                                                                                                                                                                              |
| \*url           | String | Clean text content                  | null            | Link to wrap the whole card in                                                                                                                                                                           |
| stateText       | String | Clean text content                  | null            | Text to be displayed on top of the image. Used together with modifier osg-card--with-state to have effect.                                                                                               |
| figure          | Object | See the tags figure for atom        | null            | See the figure atom for details                                                                                                                                                                          |


### Modifier Options

| Name                 | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| osg-card--animate    | See Animations section below for tips on how to use it.                          |
| osg-card--with-state | Makes the pattern green, text white, and shows the "stateText" if it is defined. |

(\*) mandatory

### Animations

Trigger animations by adding

```css
.osg-card {
  visibility: hidden;
}
```

in your css and then adding the modifier "osg--animate" to the root element with javascript.
