### General
Basic html5 player example with subtitles.

[w3 - html5 video spec](https://www.w3.org/TR/2011/WD-html5-20110113/video.html)

### Data Fields

| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options bellow | osg-v-default | Name of the variant |
| modifiers | String | See modifier options bellow | null | Name of the modifier |
| posterUrl | String | Clean text content | null | Url to image file |
| *videoUrl | String | Clean text content | null | Url to video file |
| *subtitlesUrl | String | Clean text content | null | Url to subtitles file |

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-custom-video-controls | Html5 video with custom play button. Needs javascript to work |

### Modifier Options
| Name | Description |
|------|-------------|
| osg-m-ratio-1x1 | Forced ratio, responsive |
| osg-m-ratio-4x3 | Forced ratio, responsive |
| osg-m-ratio-3x2 | Forced ratio, responsive |
| osg-m-ratio-16x9 | Forced ratio, responsive |

(*) mandatory
