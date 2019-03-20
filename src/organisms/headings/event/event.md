### General
Header for an event page

### Blocks
This pattern has three blocks named "head", "body" and "footer". The "head" block contains the header and the header tag. The "body" block contains the rest of the pattern. The "footer" block is empty by default and content passed to this block will render below the image and image caption.

### Data Fields
| Attribute | Type   | Values                     | Default | Description                                                                                                |
| --------- | ------ | -------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| modifiers | String | See modifier options below | null    | Name of the modifier                                                                                       |
| *heading  | String | Clean text content         | null    | Heading text content                                                                                       |
| stateText | String | Clean text content         | null    | Text to be displayed on top of the image. Used together with modifier osg-card--with-state to have effect. |

### Modifier options
| Name                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| osg-event--with-state | Makes the pattern green and shows the "stateText" if it is defined |

(*) mandatory

**See the patterns figure, infoList for more data field descriptions.**
