## Basics
Contributions to Oslo Designsystem should be fun and painless. However, an understanding of how it's built and what rules to follow is needed to maintain a high quality product.

## Concepts
Oslo Designsystem is built and maintained to provide a set of styles and components commonly used in oslo.kommune.no and related projects. It is not meant to solve all digital use-cases in Oslo kommune.

## Should "this" be in Oslo Designsystem?
If "this" qualifies as a component, is approved by a maintaining designer of Oslo Designsystem and is common enough for use in multiple projects the answer is yes.

## How do we define a component?
A component is a selection of other components, html elements and/or styles put together following a specific set of rules as a group. Each component is independent and must not inherit from other components. However, they may use common styles provided by Oslo Designsystem.

## Technical
Understanding Oslo Designsystem repositories
Oslo Designsystem consists of two repositories. The `ukeweb_designsystem` repository, which follows semver.org, and the `ukeweb_designsystem_devtools` repository. Each major version of the latter will work against the corresponding major version of the former.

## ukeweb_designsystem
The `ukeweb_designsystem` repository consists of raw files. Fonts, icons, css, js, vue, html and json. This is what is "consumed" by projects.

The framework has a rather simple structure. <br>
**assets** hold fonts, icons and images. <br>
**common** consists of global styles like reset, font, icons and body. <br>
**components** has all of the components. <br>
**general** generates css classes and its documentation which can be used directly in html. <br>
**getting_started** documents how to consume and how to contribute. <br>
**packages** contains combinations of Designsystem which lets you consume it in different ways. <br>
**templates** Shows the core templates used on oslo.kommune.no <br>
**system** hold the core of the scss framework. It does not generate css by itself but is rather consumed by components which in turn generate css. <br>
**utils** hold helper scripts for mundane tasks. <br>

## ukeweb_designsystem_devtools
The `ukeweb_designsystem_devtools` repository consumes the ukeweb_designsystem repository (just like any project would) and is the very application you now use to browse and contribute to the ukeweb_designsystem repository.

Write code in `ukeweb_designsystem`. View and verify in `ukeweb_designsystem_devtools`.

## Developing
First and foremost, study the examples provided in "Contribute". Both visually and code. They are created to provide a reference for best practice and is what your code will be checked against in code reviews.

As of the 1.0 release of the Designsystem we are using Javascript ES6 (ECMAScript2015) and Vue 2.

Please follow the Vue styleguide to avoid errors, bikeshedding and anti-patterns. The vue devtools are currently not working properly because of iframe.

## Styling
The stylguide adheres to CSS 3, and uses SCSS for structure. Do not use SASS.

## Spacing
A root element in a component should never have margin. Spacing between components must be applied in projects / contexts or it will decrease the reusability of the component.
Use the predefined spacing values.

## Font size
Avoid setting font size on inline components as they will normally get their size from the context of which they are used in. Typical inline components are links and icons.
Use the predefined font sizes.

## Scaling
Make sure to use proper rem and em values. Avoid fixed size elements. You should be able to increase the font size in your browser (not zoom!) without breaking anything.

## BEM
Make sure to follow the BEM naming convention for (S)CSS.
Content of a component should always be "BEMified" if the content is required. Optional content must not be "BEMified". Content means text, headings and/or images. An exception to this rule is the grid system, if the grid system is used in a component, do not "BEMify" it.

## Use of @extend / @use
You must @extend or @use from `system` if values are available there.

## General rules
Formats
The following formats are supported.
html for the component code
js for the component javascript
vue for the component vue code
scss for the component styling
json for the component configuration in devtools

Make sure to add javascript and scss files to the corresponding _index files in the root folders or they won't be included.

## Things with special meaning
`ukeweb_designsystem_devtools` will interpret the following cases in `ukeweb_designsystem`:
_ in folder names will end up as a space when viewed in devtools <br>
`ods-devtools-code` applied as a class to an html element will make the innerHTML of the element visible in a "View code" box. Adding a child element with the class ods-devtools-code__box will instead only show the innerHTML of this element in "View code." Giving more options in terms of layout. This class also supports colors by adding a modifier class ods-devtools-code__box--{palette color}. A child element of the ods-devtools-code__box with the class ods-devtools-code__box__code will only show the innerHTML of this element in the "View code" box, further enhancing the ability to customize the layout of the component and code examples. <br>
`ods-devtools-devmode` applied as a class to an html element will make the child elements only visible on the "Developer" tab <br>
`ods-devtools-nondevmode` applied as a class to an html element will make the child elements only visible on the "Overview" tab <br>
`ods-devtools-text-preset-1` applied as a class to a heading element followed by a paragraph will create the desired spacing for the "Overview" tab.

## Accessibility
All components are WCAG 2.1 AA compliant and follow the guidelines from Digdir.

Custom components without native HTML equivalents are not inherently accessible and often require ARIA attributes to convey the necessary semantic information. Consult the ARIA guidelines to determine if your component needs ARIA enhancements.

All compontents are tested as individal patterns, but when you use one component you must test the whole page to ensure the component is accessible when interacting with other elements of the page.

## Checklist for development
- Keyboard navigation with visual focus and correct order.
- Use alternative text in images and an empty one when the image is not relevant.
- Correct use of labels, for example use aria-label when it is not visible.
- Group form elements when necessary with <leyend>
- Subtitles in videos.
- Check color contrast.
- Ensure role, value and name to all elements so they are understand by the assistive technology.
- Define a language, for example <html lang="en">
- Use semantic structure and heading.
- Follow the formatting rules provided by the linter for both Javascript and SCSS
- Use skip link and landmarks.

## Testing
The latest version of the following browsers must be supported fully:
Firefox, Chrome, Edge, Safari and Samsung Internet

### Example photos and illustrations
To make development easy you can use the following illustrations in 70x70 or 300x300 from 1 to 21.
https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/illustrations/70x70/{1-21}.png https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/illustrations/300x300/{1-21}.png

Photos can be found here:
https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/

There are 32 photos, 1.jpg to 32.jpg with the following exceptions: <br>
220x275 only has 20.jpg and 30.jpg. <br>
2560 is lacking photo 6.jpg, 8.jpg, 11.jpg and 16.jpg.

Folder names:
220x275/
300x300/
800x800/
768/
1024/
1920/
2560/

Examples:
https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/300x300/1.jpg https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/1024/2.jpg https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/2560/18.jpg
