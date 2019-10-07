### General

This pattern is used to make an entry link to a campaign.

### Blocks

This pattern has one block named "content". Content passed to the block will render below the image and image caption.

### Examples

Example of clickable pattern with circular image, text on the left of the image on tablet and bigger resolutions, and with padding below the image on mobile.



### Data Fields

| Attribute | Type   | Values                     | Default       | Description                    |
| --------- | ------ | -------------------------- | ------------- | ------------------------------ |
| variant   | String | See variant options below  | osg-v-default | Name of the variant            |
| modifiers | String | See modifier options below | null          | Name of the modifier           |

(\*) mandatory

### Modifier Options

| Name                            | Description                    |
| ------------------------------- | ------------------------------ |
| osg-hero--circle                | Makes the image circular       |
| osg-hero--left{-tablet-and-up}  | Text on the left of the image  |
