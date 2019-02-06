### General
Multi-purpose container for previewing part of content, usually some form of article.

| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | [1]osg-v-default, [2]osg-v-alert | "osg-v-default" | [1]Default variant, [2]Example with alert |
| date | String | Clean text content | null | Used for putting either one date or  a from and a to date |
| heading | String | Clean text content | null | Content heading |
| text | String | Clean text content | null | A paragraph |
| content | html | html content | null | Used to display additional information. Will be parsed as html. |
| tag | String | Clean text content | null | A tag that sits above the date |
| link | String | Object with url and text | null | A link that has a chevron right icon, usually used for a read more link |
