### General
Navbar hamburger menu with slide in effect from the left.

Append class .osg-v-open to nav.osg-navbar-menu to open the menu.

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| variant | String  | osg-v-default, osg-v-open | "osg-v-default" | Name of the variant |
| modifiers | String | Any global css class | null | Root class to modify styles |
| *links | Array | List of objects. See the "Link Object Data Fields" section below | [] (empty array) | Array of link objects |
| *languages | Array | List of objects. See the "Language Object Data Fields" section below | [] (empty array) | Array of language objects |
| topDomainLink | Object | text:String, url:String | null | Link to parent site |
| topDomainLink.text | String | Clean text content | null | Text for top domain link |
| topDomainLink.url | String | Valid url | null | Url to where the top domain link points |
| *logos | Object | Array of figures | null | Wrapper object for the figures array |
| *figures | Array | List of objects. See the figure pattern documentation for figure field descriptions | null | Array of figure objects |

#### Link Object Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *text | String | Clean text content | null | Text for menu link |
| *url | String | Valid url | null | Url to where the menu link points |

#### Language Object Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *text | String | Clean text content | null | Text for language link |
| *url | String | Valid url | null | Url to where the language link points |

(*) mandatory

### Javascript Functionality

Example code for opening and closing the menu:

```javascript
const toggleAriaAttributes = (menuEl, flag) => {
  const menuToggleButton = menuEl.querySelector('.osg-navbar-hamburger .osg-navbar-hamburger-icon')
  const closeMenuButton = menuEl.querySelector('.osg-navbar-hamburger-close .osg-navbar-hamburger-icon')

  menuToggleButton.setAttribute('aria-hidden', flag)
  closeMenuButton.setAttribute('aria-expanded', flag)
  menuToggleButton.setAttribute('aria-expanded', flag)
}

//run when content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const bodyEl = document.querySelector('body')
  const menuEl = document.querySelector('.osg-navbar-menu')

  // Click event listener that toggles the menu
  // Will append/remove .osg-v-open to .osg-navbar-menu
  const menuToggleDiv = menuEl.querySelector('.osg-navbar-hamburger')
  menuToggleDiv.addEventListener('click', () => {
    if (menuEl.classList.contains('osg-v-open')) {
      menuEl.classList.remove('osg-v-open')
      toggleAriaAttributes(menuEl, false)
      bodyEl.style.overflow = 'scroll'
    } else {
      menuEl.classList.add('osg-v-open')
      toggleAriaAttributes(menuEl, true)
      bodyEl.style.overflow = 'hidden'
    }
  })

  // Click event listener for closing the menu
  // Will remove the .osg-v-open class from .osg-navbar-menu
  const closeMenuDiv = menuEl.querySelector('.osg-navbar-hamburger-close')
  closeMenuDiv.addEventListener('click', () => {
    menuEl.classList.remove('osg-v-open')
    toggleAriaAttributes(menuEl, false)
    bodyEl.style.overflow = 'scroll'
  })

  menuEl.addEventListener('click', event => {
    const content = menuEl.querySelector('.osg-navbar-menu-content')
    // Close menu if user clicks outside the menu
    if (event.offsetX > content.offsetWidth) {
      menuEl.classList.remove('osg-v-open')
      toggleAriaAttributes(menuEl, false)
      bodyEl.style.overflow = 'scroll'
    }
  })
})

```

### Accessibility
The hamburger button and the close button have *aria-haspopup* and *aria-expanded* attributes to allow the screen readers know that the button has something to expand and if it expanded or not. Also their values need to be toggled depending on the following situations:

**Initially**: The close button doesn't need *aria-hidden* because it is hidden with css in the way the screen reader doesn't detects it, so nothing is required.

**Expanded menu**: The hamburger button *aria-hidden* is set to true, so we can't access with the screen reader to it. The close button toggles *aria-expanded* to true.

**Collapsed menu**: The hamburger button *aria-hidden* is set to false, and the close button toggle *aria-expanded* to false.
