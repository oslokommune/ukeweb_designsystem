### General
Header for an event page

### Blocks
* topContent: will be rendered on top of the image. You can replace the whole block, or pass data to the variable heading.
* listContent: will be rendered in the link_list box under the list.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| modifiers | String | See modifier options below | null | Name of the modifier |
| *heading | String | Clean text content | null | Heading text content |
| stateText | String | Clean text content | null | Text to be displayed on top of the image. Used together with modifier osg-m-with-state to have effect. |

### Modifier options
| Name | Description |
|------|-------------|
| osg-event--with-state | Makes the pattern green and shows the "stateText" if it is defined |

(*) mandatory

**See the patterns figure, infoList for more data field descriptions.**
