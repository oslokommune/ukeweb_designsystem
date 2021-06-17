## Video content

See https://designmanual.oslo.kommune.no/video for more documentation about the technical requirements of the video content itself.

### Captions

All videos with speech must have captions. Can be a part of the video image, or supplied as one or more VTT-files.

## Hosting your own video

When hosting your own video, you *must* provide `<source>` with `webm` and/or `mp4` file types.

### CORS - Cross origin

If hosting your own video, you might have issues with CORS if you serve the video from another domain than the one used for the HTML.

You can add the attribute `crossorigin="anonymous"` to the `<video>`-tag.

Be sure to send the correct `Access-Control-*` headers from the server(s)/CDN-service you're using. Typically `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`.

## Required attributes

The following attributes are required for the `<video>`-tag:

- `controls` - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-controls
- `preload="metadata"` - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload

### Video as animation

If using the video as an animation, do the following changes to the attributes of the `<video>`-tag:

- Add `role="presentation"` if the video is purley for used decoration.
- Remove `controls` and `poster`.
- Change `preload="metadata"` to `preload="auto"`.
- Add `autoplay`, `loop` and `muted`.

## Additional attributes

If needed you can the following attributes to the `<video>`-tag.

- `poster`, note this *must* be added if hosting your own video - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster
- `loop` - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop
- `muted` - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-muted
- `crossorigin` - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-crossorigin
- `role="presentation"` - https://www.w3.org/TR/wai-aria-1.1/#presentation
