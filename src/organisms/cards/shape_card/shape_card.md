
### General
This pattern is primarily to be used for...

### Data Fields
| Attribute | Type | Values | Default | Description |
|-----------|------|--------|---------|-------------|
| *variant | String  | osg-v-default | "osg-v-default" | Default variant |
| modifiers | String | osg-m-left{-tablet} <br/> osg-m-right{-tablet} <br> osg-m-shape-in-image{-tablet} | null | Positions the shape to the left <br/> Positions the shape to the right <br/> Puts the shape inside the image |
| *url | String | clean string content | null | Link to wrap the whole card in |
| stateText | String | clean string content | null | Text to be displayed on top of the image. Used together with modifier osg-m-with-state to have effect. |
| searchResult | String | clean string content | null | Facilitates the need to display part of a text content related to the destination of the url, as part of a search solution. Used together with the modifier osg-m-show-search-result to have effect. |
| alert | Object | See the alert atom for details | null | See the alert atom for details |


(*) mandatory
