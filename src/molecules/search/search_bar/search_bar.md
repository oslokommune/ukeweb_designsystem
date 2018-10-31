### General
This pattern is primarily used for content search


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

#### Modifiers
- .osg-m-color-green: Change color and placeholder color to green.
