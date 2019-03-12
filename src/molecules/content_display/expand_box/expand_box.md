### General
Expandable box, used to show info which can be hidden away.

### Blocks
This pattern has two blocks named "content" and "buttonContent". Content passed to the "content" block will render inside the expanded box. Content passed to the "buttonContent" block will render inside the round button, and override the default button content which is a chevron down icon.

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
