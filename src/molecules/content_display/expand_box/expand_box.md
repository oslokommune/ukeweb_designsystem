### General
Expandable box, used to show info which can be hidden away.

### Blocks
This pattern has one block named "content". Content passed to the block will render inside the expanded box.

### Data Fields

| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options below | osg-v-default | Name of the variant |
| title | String | Clean text content | null | title of the box |

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Default closed |
| osg-v-open | The expanded state for the box |

### Javascript
Toggle the open variant and aria-expanded boolean with a click event on the button.
