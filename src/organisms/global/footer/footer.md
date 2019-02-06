### General
This is the bottom of every page.


### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String  | osg-v-default, osg-v-open | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| *linkList | Array | List of objects. See the "Link Object Data Fields" section below | null | Array of link objects |
| *languageLink | Object | text:String, url:String | null | Link to a translated version of the site |
| *languageLink.text | String | Clean text content | null | Text for language link |
| *languageLink.url | String | Valid url | null | Url to where the language link points |
| topDomainLink | Object | text:String, url:String | null | Link to parent site |
| topDomainLink.text | String | Clean text content | null | Text for top domain link |
| topDomainLink.url | String | Valid url | null | Url to where the top domain link points |
| *logos | Object | figures:Object | null | Logos for the right side of the footer |
| *logos.figures | Array[Figure] | null | Logos array |
| *logos.figures.figure | Object | See figure pattern | null | Figures for the logos |


#### LinkList Object Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *text | String | Clean text content | null | Text for menu link |
| *url | String | Valid url | null | Url to where the menu link points |

(*) mandatory

See the iconList pattern docs for the iconList patterns data field descriptions.
