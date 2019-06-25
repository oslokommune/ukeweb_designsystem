# JavaScript Components

How to deal with global and pattern styles in a typical js framework.

## Global

Every style guide patterns sass might need the fundamentals of the style guides global styles or might use util classes, so to start of your project you should import the common stylesheet

```sass
@import "~styleguide/src/assets/sass/common.sass"
```

## Components

When making components you usually want to scope the style of that components pattern to the component. This is possible with the style guide, but each pattern could need resources like variables, maps or mixins. Even though you have imported the common sass file, the raw internals like variables, mixins and maps will not be available to your components. All of the variables, maps and mixins can be imported as one file called resources. Importing this file ensures that the patterns sass file has all its dependencies without creating extra css.

So if you are making a button component in Vuejs and want it to look like the style guides button you would write

```vue
<style lang="sass">
@import "~styleguide/src/assets/sass/resources.sass"
@import "~styleguide/src/atoms/buttons/button/button.sass"
</style>
```
