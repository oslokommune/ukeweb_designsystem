## Motivation

Some patterns in css naming recurr too much, e.g you make a wrapper div called osg-wrapper, then you include another component in that component, the other component also has an osg-wrapper and now you have overlap. So having some kind of system for avoiding this kind of problem is desirable.

Another thing is that our concept of modifers and variants can only be applied to the pattern parent, but if you have a component which includes many patterns, from the html point of view it is hard to tell where modifiers and variants can be applied.

Also, given that this is a library, it needs certain properties to be reusable. First of all selectors should have low spesificity, so they are easy to override for a consumer. Low specificity gives us the problem that our own styles might clash.

## Solution

BEM(Block Element Modifier)

[Getting your head around bem](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

- **Block** The sole parent of a pattern, named .osg-dash-separated-name
- **Element** Part of a block, named .osg-block-name\_\_element-name
- **Modifier** Stylistic change to a block, named .osg-block-name--modifier-name

This system gives each pattern and each element in a pattern a unique name, which makes sure that we do not accidentaly have two .wrapper elements, also with this system it is always clear which elements can have modifiers/variants applied to them. Finally given that the names are unique we do not need a heavily nested structure, just one level under a pattern and another under modifiers. Otherwise the structure is completely flat, which makes it easy to override for a consumer.

All patterns are prefixed by osg, to not conflict with consumer code or code from other libraries.

So the top level div for a pattern would be called:  
`.osg-story-preview`  
the p prefix is only supposed to be used in the parent, so a wrapper would be
`.osg-story-preview__wrapper`  
, modifier would be
`.osg-story-preview--big`

This requires a lot of typing however, so here are some tricks to get around that.

```scss
.osg-story-preview
  &__heading
    ...
  &__body
    ...
  &__footer
    ...
```

This makes it nice to write elements, but what about sub elements?
The simple answer is don't have that, the goal is to only have one level of indentation, so even though the html is heavily nested we don't nest the css.
What about included/embeded components inside?

```scss
.osg-story-preview
  &__heading
    .osg-content-box // Included component
      &__heading
        ...
      &__body
        ...
```

One problem is when we have a modifier, this requires another level of indentation, here is a way to deal with that.

```scss
.osg-story-preview
  &--big // included
    .osg-content-box
      &__body
        ...
  &--big & // Elements
    &__heading
    ...
```

The &--big & makes it so that elements under it can use &\_\_ and turn out correct, this way if you see &--big on it's own it means that it is selecting included/embeded components or is applying styles to the root. The &--big & means it is selecting elements belonging to this pattern.

If you really need to refer to elements with a lot of nesting, there are a few ways to deal with it.

```scss
.osg-story-preview// Solution 1: Write a long selector
  &__heading > figure > picture > &__image > img

  // Solution 2: Make a root variable
  $root: &
  &__heading
    #{$root}__text
      ...
    #{$root}__image
      ...
  // Write out the full names of the classes
  .osg-v-circle .osg-story-preview__heading;
```

For more on the ampersand, see here [the sass ampersand](https://css-tricks.com/the-sass-ampersand/)

Another problem is when using mixins, consider the following case

```scss
.osg-story-preview
  &.osg-v-circle
    +image-big()
```

if that mixin want to refer to any elements using & we get a problem, one point is that a mixin generally should not refer to elements, however if it is needed this is a solution

```scss
=image-big($root)
  #{$root}__image
    width: 250px
    height: 250px

.osg-story-preview
  $root: &

  &__image
    width: 150px
    height: 150px
  .osg-v-big
    +image-big($root)
```
