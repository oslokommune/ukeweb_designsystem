### General

Expand Box contains a title and an area for content that can be collapsed or expanded upon clicking the button.

### Blocks

| Name          | Default                     | Description                     |
| ------------- | --------------------------- | ------------------------------- |
| content       | null                        | renders inside the expanded box |
| titleContent  | null                        | renders inside the title area   |
| buttonContent | a chevron down icon element | renders inside the round button |

### Data Fields

| Attribute          | Type   | Values                    | Default       | Description                                       |
| ------------------ | ------ | ------------------------- | ------------- | ------------------------------------------------- |
| variant            | String | See variant options below | osg-v-default | Name of the variant                               |
| \*expandableAreaId | String | Clean text content        | null          | target id for the buttons aria-controls attribute |

See the button patterns data fields for how to add the aria-controls and aria-expanded attributes.

### Variant Options

| Name          | Description                    |
| ------------- | ------------------------------ |
| osg-v-default | Default closed                 |
| osg-v-open    | The expanded state for the box |

### Javascript

Toggle the Expand Box open variant and the Button aria-expanded attributes boolean value upon clicking the button.
