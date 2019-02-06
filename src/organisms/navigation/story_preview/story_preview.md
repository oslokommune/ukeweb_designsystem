### General
This pattern is primarily to be used for previewing part of content basically an image, text and a link.

### Note on the link
This component can either have no link on it, have a link at the bottom or the whole component can be a link.
If no link is passed, either in the storyPreview object or the contentBox object and allClickable is not passed or set to false, the component will have no link.
If a link is passed to contentBox, there will be a link at the bottom of the component.
If a link is passed to storyPreview and allClickable is set to true, the whole component will be a link, the text at the bottom will be underlined on hover.


| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | [1]osg-v-default<br> [2]osg-v-circle | "osg-v-default" | [1]Default<br> [2]figure is a circle |
| modifiers | String | [1]osg-m-big<br> [2]osg-m-left<br> [3]osg-m-right<br> [4]osg-m-top | null | [1]makes the text bigger<br> [2]text on the left of the image<br> [3]text on the right of the image<br> [4]text on the top of the image |
| allClickable | boolean | true, false | null | Makes the story preview a link, link must be passed in for this to work |
| link | Object | url, text, srText | null | Link for the component, does nothing if allClickable is not true |

**All modifiers in this pattern can have a "-tablet" postfix (i.e osg-m-right-tablet) to make the modification happen only on devices "bigger than mobile".**
