### General
This pattern is similar to the card pattern, but for use in lists.

Remove the variant "osg-v-circle" from the shape to get a squared image.

### Image sizes
Mobile should be 150x150px and from tablet and up should be 210x210px.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String  | osg-v-default | "osg-v-default" | Name of the variant |
| modifiers | String | [1]osg-m-animate<br>[2]osg-m-with-state | null | See details below in the Modifiers section |
| *url | String | clean string content | null | Link to wrap the whole card in |
| stateText | String | clean string content | null | Text to be displayed on top of the image. Used together with modifier osg-m-with-state to have effect. |
| searchResult | String | clean string content | null | Facilitates the need to display part of a text content related to the destination of the url, as part of a search solution. Used together with the modifier osg-m-show-search-result to have effect. |
| alert | Object | See the alert atom for details | null | See the alert atom for details |
| contentBox | Object | See the contentBox molecule for details | null | See the contentBox molecule for details |
| tags | Object | See the tags molecule for details | null | See the tags molecule for details |
| figure | Object | See the tags figure for atom | null | See the figure atom for details |

(*) mandatory

### Modifiers
- animate: see documentation for the card pattern for tips on how to trigger animations.
- with-state: makes the pattern green, text white, and shows the "stateText" if it is
