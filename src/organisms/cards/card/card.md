### General
Multi-purpose container for previewing part of content, usually some form of article.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String | See "variant options" section below | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| *url | String | Clean text content | null | Link to wrap the whole card in |
| stateText | String | Clean text content | null | Text to be displayed on top of the image. Used together with modifier osg-m-with-state to have effect. |
| searchResult | String | Clean text content | null | Facilitates the need to display part of a text content related to the destination of the url, as part of a search solution. Used together with the modifier osg-m-show-search-result to have effect. |
| alert | Object | See the alert atom for details | null | See the alert atom for details |
| contentBox | Object | See the contentBox molecule for details | null | See the contentBox molecule for details |
| tags | Object | See the tags molecule for details | null | See the tags molecule for details |
| figure | Object | See the tags figure for atom | null | See the figure atom for details |

### Variant Options

| Name | Description |
|------|-------------|
| osg-v-default | Is used if nothing is defined. Does nothing extra. |
| osg-v-download | Adds a download icon |

### Modifier Options
| Name | Description |
|------|-------------|
| osg-m-animate | see Animations section below for tips on how to use it. |
| osg-m-with-state | makes the pattern green, text white, and shows the "stateText" if it is defined. |
| osg-m-left{-tablet} | Makes the contentBox in the card stick to the left of the image with a margin on the right |
| osg-m-right{-tablet} | Makes the contentBox in the card stick to the right of the image with a margin on the left |
| osg-m-full{-tablet} | contentBox gets 100% wide |


(*) mandatory

### Animations
Trigger animations by adding the modifier "osg-m-animate" to the root element.

Example CodePen: https://codepen.io/janeirikh/pen/jvYJvg?editors=0010

```javascript
(function(){

  /**
  * Add class to elements when they are scrolled into view.

  * elements:     List of elements
  * classes:      List of CSS-classes added to element when scrolled into view
  * sensitivity:  Numeric value indicating how much of the element that should be visible in the viewport before triggering.
  * unit:         Define what unit to use for calculating sensitivity. Pixels and percentages are supported. Default value is pixels but this can be changed by using 'percent' as the unit value.
  */
	function scrollReveal(elements, classes, sensitivity, unit) {
    //convert to Array
    elements = [...elements]
    // Viewport height
    const windowY = window.innerHeight || document.documentElement.clientHeight

    elements.forEach(element => {
      // Size and position info for element
      const rect = element.getBoundingClientRect();

      // Pixel value of how much of the element that should be visible before triggering
      const elementSensitivityValue = (unit == 'percent') ?
            Math.round((rect.height / 100) * sensitivity) :
            sensitivity

      const isElementInView = ((rect.top - windowY)  + elementSensitivityValue) <= 0

      if (isElementInView) {
        classes.forEach(cssClass => {
          element.classList.add(cssClass)
        })
      }
    })
	}

  // List of events to add event listener to.
  const events = [
    'load',
    'scroll',
    'resize'
  ]

  events.forEach(event => {
    // Add event listener
    window.addEventListener(event, () => {
      scrollReveal(
        document.querySelectorAll('.osg-card'), // Select all osg-card elements
        ['osg-m-animate'], // List of css classes to add
        40, // Trigger when 40 percent of the element is visible
        'percent' // Set unit to percentage. Default value is pixels
      );
    }, false)
  })
})();
```

```css
/* =============================================== */
/* Consumer CSS                                    */
/* =============================================== */

/* Hide all .osg-card elements on page load.
   This will prevent the elements from showing before
   javascript is loaded. */

.osg-card {
  visibility: hidden;
}
```

