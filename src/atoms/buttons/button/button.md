### General
Shows how to use the button classes, to add new colors go to $button-colors in buttons.sass.
Keep in mind that the text size affects to the size of the button.
If you want a different color, a css class has to be generated for that, using the proper mixin.

### Links
The button accepts a link field in the json, this will make the button an <a> tag with the link as the href.

### Other attributes
If you want to set attributes, such as id, name, data targets etc. You can add them via the dataattrs array which accepts key, val objects and adds them to the <button> or <a>.
