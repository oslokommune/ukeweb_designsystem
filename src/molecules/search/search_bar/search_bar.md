### General
This pattern is primarily used for content search

### Blocks
This pattern has one block named "buttonContent". Content passed to the "buttonContent" block will render inside the round button, and override the default button content which is a magnifying glass icon.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| modifiers | String | See modifier options below | null | Name of the modifier |

Check the included text pattern docs for more data field descriptions.

### Modifier Options
| Name | Description |
|------|-------------|
| osg-searchbar--hide-field | Hides the search box in mobile view |

### Javascript
Example showing how to set focus on the input element when clicking the search icon.
```javascript
const searchBars = [...document.querySelectorAll('.osg-searchbar')]

searchBars.forEach(search => {
  const input = search.querySelector('.osg-text-field-input')
  const icon = search.querySelector('.osg-searchbar__icon')

  icon.addEventListener('click', _ => {
    input.focus();
  })
})
```
