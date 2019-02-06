### General
Basic html5 player example with subtitles.

[w3 - html5 video spec](https://www.w3.org/TR/2011/WD-html5-20110113/video.html)

### Data Fields

| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String | [1]osg-v-default<br>[2]osg-v-custom-video-controls | "osg-v-default" | [1]Standard html5 video<br>[2]Html5 video with custom play button. Needs javascript to work |
| modifiers | String | "osg-m-ratio-1x1", "osg-m-ratio-4x3", "osg-m-ratio-3x2", "osg-m-ratio-16x9" | null | Forced ratios, responsive |
| posterUrl | String | Clean text content | null | Url to image file |
| *videoUrl | String | Clean text content | null | Url to video file |
| *subtitlesUrl | String | Clean text content | null | Url to subtitles file |

(*) mandatory
