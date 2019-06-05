### General

Multi-purpose container for previewing part of content, usually some form of article.

### Blocks

This pattern has two blocks, one named "content" and one named "extraContent". Content passed to the block will render inside the content box. Content passed to the extraContent block will be in a div under the card, which is outside of the anchor tag of the card.

### Data Fields

| Attribute       | Type   | Values                              | Default         | Description                                                                                                                                                                                              |
| --------------- | ------ | ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant         | String | See "variant options" section below | "osg-v-default" | Name of the variant                                                                                                                                                                                      |
| modifiers       | String | Any global css class                | null            | Root class to modify styles                                                                                                                                                                              |
| \*url           | String | Clean text content                  | null            | Link to wrap the whole card in                                                                                                                                                                           |
| stateText       | String | Clean text content                  | null            | Text to be displayed on top of the image. Used together with modifier osg-card--with-state to have effect.                                                                                               |
| searchResult    | String | Clean text content                  | null            | Facilitates the need to display part of a text content related to the destination of the url, as part of a search solution. Used together with the modifier osg-card--show-search-result to have effect. |
| searchResultUrl | String | Clean text content                  | null            | Link to the search result, must be passed if searchResult is passed. Cannot be used if url is passed as that would be a link in a link                                                                   |
| figure          | Object | See the tags figure for atom        | null            | See the figure atom for details                                                                                                                                                                          |

### Variant Options

| Name           | Description                                        |
| -------------- | -------------------------------------------------- |
| osg-v-default  | Is used if nothing is defined. Does nothing extra. |
| osg-v-download | Adds a download icon                               |

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
