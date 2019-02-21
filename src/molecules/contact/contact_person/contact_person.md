### General
This pattern is primarily to be used for displaying a persons image and contact information

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See variant options below | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| *name | String | Clean text content | null | Name of contact |
| *title | String | Clean text content | null | Contacts job title |
| phonePrefix | String | Number with optional plus sign | null | Country code (i.e "+47") |
| number | String | Preformatted phone number | null | Phone number |
| email.address | String | Valid email address | null | Email address |
| email.text | String | Clean text content | null | Text to display on email link |

(*) mandatory

### Variant Options
| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-circle | Makes the contact image circular |
