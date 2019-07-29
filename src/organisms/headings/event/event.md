### General

Top section for an event page

### Blocks

This pattern has two blocks named "topContent" and "listContent". The "topContent" block renders over the image and contains an overridable heading by default. The "listContent" block renders inside the green box below the icon entries (that is passed into the infoList pattern).

### Data Fields

| Attribute | Type   | Values                     | Default | Description                                                                                                 |
| --------- | ------ | -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| modifiers | String | See modifier options below | null    | Name of the modifier                                                                                        |
| \*heading | String | Clean text content         | null    | Heading text content                                                                                        |
| stateText | String | Clean text content         | null    | Text to be displayed on top of the image. Used together with modifier osg-event--with-state to have effect. |

(\*) mandatory

See the patterns figure and infoList for more data field descriptions.

ps: the heading is not mandatory if it is overridden by passing content into the "topContent" block.

### Modifier options

| Name                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| osg-event--with-state | Makes the pattern green and shows the "stateText" if it is defined |
