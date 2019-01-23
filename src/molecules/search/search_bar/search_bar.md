### General
This pattern is primarily used for content search

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| modifiers | String | osg-m-color-green | null | Change color and placeholder color to green |

Check the included text pattern docs for more data field descriptions.

### Javascript
Example showing how to set focus on the input element when clicking the search icon.
```javascript
const searchBars = [...document.querySelectorAll('.osg-searchbar')]

searchBars.forEach(search => {
  const input = search.querySelector('.osg-text-field-input')
  const icon = search.querySelector('.osg-searchbar-icon')

  icon.addEventListener('click', _ => {
    input.focus();
  })
})
```
