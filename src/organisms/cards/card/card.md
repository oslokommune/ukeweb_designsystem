### General

Multi-purpose container for previewing part of content, usually some form of article.

### Blocks

This pattern has one block named "content". Content passed to the block will render inside the content box.

### Data Fields

| Attribute    | Type   | Values                              | Default         | Description                                                                                                                                                                                       |
| ------------ | ------ | ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant      | String | See "variant options" section below | "osg-v-default" | Name of the variant                                                                                                                                                                               |
| modifiers    | String | Any global css class                | null            | Root class to modify styles                                                                                                                                                                       |
| \*url        | String | Clean text content                  | null            | Link to wrap the whole card in                                                                                                                                                                    |
| stateText    | String | Clean text content                  | null            | Text to be displayed on top of the image. Used together with modifier osg-card--with-state to have effect.                                                                                        |
| searchResult | String | Clean text content                  | null            | Facilitates the need to display part of a text content related to the destination of the url, as part of a search solution. Used together with the modifier osg-card--show-result to have effect. |
| figure       | Object | See the tags figure for atom        | null            | See the figure atom for details                                                                                                                                                                   |

### Variant Options

| Name           | Description                                        |
| -------------- | -------------------------------------------------- |
| osg-v-default  | Is used if nothing is defined. Does nothing extra. |
| osg-v-download | Adds a download icon                               |

### Modifier Options

| Name                     | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| osg-card--animate        | See Animations section below for tips on how to use it.                                    |
| osg-card--with-state     | Makes the pattern green, text white, and shows the "stateText" if it is defined.           |
| osg-card--show-result    | Makes the search result visible                                                            |
| osg-card--left{-tablet}  | Makes the contentBox in the card stick to the left of the image with a margin on the right |
| osg-card--right{-tablet} | Makes the contentBox in the card stick to the right of the image with a margin on the left |
| osg-card--full{-tablet}  | ContentBox gets 100% wide                                                                  |

(\*) mandatory

### Animations

Trigger animations by adding

```css
.osg-card {
  visibility: hidden;
}
```

in your css and then adding the modifier "osg--animate" to the root element with javascript.
