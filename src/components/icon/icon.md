### General

Displays svg icons. Use in combination with an icon util class. Read the docs (in the styleguide repo) about util classes to know which icon util classes exists. If you are using twig, you can pass util classes into the field called "modifiers".

You can use the color-text utils to color the icons like this:

`<span class="osg-icon osg-icon--exclamation-mark-circle osg-color-text-red"></span>`

To get this:
<span class="osg-icon osg-icon--exclamation-mark-circle osg-color-text-red"></span>

You can use the heading and text utils to change the size like this:

`<span class="osg-icon osg-icon--exclamation-mark-circle osg-heading-1"></span>`

To get this:
<span class="osg-icon osg-icon--exclamation-mark-circle osg-heading-1"></span>
### Data Fields

| Attribute | Type   | Values                    | Default                   | Description                 |
| --------- | ------ | ------------------------- | ------------------------- | --------------------------- |
| variant   | String | See variant options below | "osg-v-default"           | Name of the variant         |
| modifiers | String | Any global css class      | "osg-icon--chevron-right" | Root class to modify styles |
