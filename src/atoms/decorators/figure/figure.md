### General
This pattern includes a way to pass in several versions of an image to target different viewports, one for each breakpoint.

You pass in the default image to figure.img.defaultUrl and add optional media query specific images to figure.img.mediaQueryUrls.

It can be linkable by adding the figure.link.url and figure.link.target.


### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | osg-v-default | "osg-v-default" | Default variant |
| caption | String | Clean text content | null | Text to be displayed at the bottom of the image |
| linkUrl | String | Clean text content | null | Url of the link |
| *img | Object | [1] alt:String, <br> [2] defaultUrl:String <br> [3] mediaQueryUrls:Array | null | [1] Description of the image <br> [2] Url source of the image <br> [3] Breakpoint and url of each image |
| img.mediaQueryUrls | Array | [1] query:String, <br> [2] url:String | null | [1] Breakpoint, the format is "min-width: (value)px" or "max-width: (value)px" <br> [2] Url of the image |
