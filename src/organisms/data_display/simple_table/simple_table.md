### General
Native table with a class for styling.

This pattern is probably best consumed as html (and not twig) as tables will have many ways of presenting data, not covered by the twig implementation. To use it on a table, wrap the table element in an element with the class osg-c-simple-table.

Includes a pattern specific helper class, osg-simple-table__data-separator, for having different information in same cell, which is separated by line breaks on mobile, and space on tablet and up.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| modifiers | String | Any global css class | null | Root class to modify styles |

(*) mandatory
