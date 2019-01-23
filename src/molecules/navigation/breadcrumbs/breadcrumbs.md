### General
Breadcrumbs is a vertical list of links, typically displayed once at the top of every page in a site. Last element is not a link, because it is the page that the user is currently viewing.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| modifiers | String | Any global css class | null | Root class to modify styles |
| *paths | Array | List of objects. See the "Path Object Data Fields" section below | null | Array of path objects |

#### Path Object Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| text | String | Clean text content | null | Text inside path link |
| url | String | Valid url | null | Url to where the path link points |

(*) mandatory
