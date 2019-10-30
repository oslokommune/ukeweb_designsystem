## 1. Install Styleguide as an NPM module

In your project folder run:

```shell
npm install minireset.css git+ssh://git@github.com/oslokommune/styleguide.git#0.35.1
```

Your package.json should now contains theese two lines under "dependencies":

```shell
// package.json

"minireset.css": "0.0.5",
"styleguide": "git+ssh://git@github.com/oslokommune/styleguide.git#0.35.1"
```

Package versions will most likely differ compared to this snippet.

## 2. Configure styling

Ensure that your build system compiles SASS. Depending on your compiler, you
might need to set up SASS transpilation as a build step. In webpack this
step would be to add and configure "sass-loader" (and resolve-url-loader and
file-loader) and import your .sass/.scss entry file into your JS entry file.
Then you need to ensure that all the styleguides references to fonts are
pointing to the the correct location relative to your project root. This is
done by overriding a variable supplied by the styleguide like this:

```shell
// index.sass

$osg-font-path: "~styleguide/src/assets/fonts"
```

Now the setup is ready to import styles from the styleguide and to prepare
for implementing of styleguide patterns, we first need to set up the beer
minimum of styles, which is the file named common.sass which contains global
styles, util classes, the osloSans font etc.

```sass
// index.sass

@import "~styleguide/src/assets/sass/common"
```

## 3. Implement patterns

Now that you have a .sass or .scss entry file that transpiles to css and is
referenced in your webapp (index.html), you can navigate to a pattern you
would like to implement, say the card pattern, copy the style assets that is
needed and the markup.

You can find the card by searching for "card" in the top left of this page,
or navigate to ORGANISMS > Cards > Card in the left menu.

### Implementing pattern styles

The styles can be copied to the clipboard by clicking the "css" button next
to all style references under the headline "ASSETS" in the Card patterns
documentation. Paste theese in to your SASS:

```shell
// index.sass

@import "~styleguide/organisms/cards/card/card.sass"
```

As you can see, the card has two "INCLUDES" which are "figure" and
"content_box", so we also need to add theese into the entry SASS file like
so:

```shell
// index.sass

@import "~styleguide/atoms/decorators/figure/figure.sass"
@import "~styleguide/molecules/content_display/content_box/content_box.sass"
```

Your entry SASS file should now contain this content:

```shell
// index.sass

// path to styleguide fonts
$osg-font-path: "~styleguide/src/assets/fonts"

// styleguide common styles
@import "~styleguide/src/assets/sass/common"

// styleguide pattern styles
@import "~styleguide/atoms/decorators/figure/figure.sass"
@import "~styleguide/molecules/content_display/content_box/content_box.sass"
@import "~styleguide/organisms/cards/card/card.sass"
```

you can offcourse decide to split this into separate files as you please.

#### Note about stylesheets in a javascript framework

In the case that you are using a component based javascript framework we
would suggest that you import the common.sass globally and the patterns
stylesheet in a component with the same name as the pattern.

In a lot of cases with theese frameworks you would also need to add the file
resources.sass before the pattern stylesheet in your component to make the
pattern styles work. This is because SASS imported globally gets compiled to
css before it reaches the component so things like variables and mixins from
the common.sass file are not available to the component. The resources.sass
does not compile to any css by itself, but contains all the variables, maps,
mixins and functions that the patterns SASS might be using. This SASS file
will not create duplicated css in production no matter how many times you
import it.

So in this case your entry SASS file would include this:

```sass
// index.sass

// path to styleguide fonts
$osg-font-path: "~styleguide/src/assets/fonts"

// styleguide common styles
@import "~styleguide/src/assets/sass/common"
```

And your component would include this:

```vue
// Card.vue

// styleguide variables, mixins etc
@import "~styleguide/src/assets/sass/resources"

// styleguide pattern styles
@import "~styleguide/atoms/decorators/figure/figure.sass"
@import "~styleguide/molecules/content_display/content_box/content_box.sass"
@import "~styleguide/organisms/cards/card/card.sass"
```

### Implementing pattern markup

Back at the Card patterns documentation you can now switch tab from "Docs"
to "HTML" and press the "Copy" button under the code snippet to copy the
code to your clipboard. Paste this into your project or component template
so it looks like this:

```html
// index.html / Card.vue
<div class="osg-card osg-v-default ">
  <a
    href="#lorem"
    title="Lorem ipsum dolor sit amet."
    class="osg-card__wrapper"
  >
    <div class="osg-card__image-container">
      <figure class="osg-figure osg-v-default ">
        <picture>
          <img
            src="https://picsum.photos/960/540/?random"
            alt="Lorem ipsum dolor sit amet."
          />
        </picture>
      </figure>
    </div>
    <div class="osg-content-box osg-v-default ">
      <div class="osg-content-box__container">
        <!-- your content here -->
      </div>
    </div>
  </a>
  <div class="osg-card__extra-content">
    <!-- your content here -->
  </div>
</div>
```

Now you should now have a working copy of the Card with proper styles, and
can start customizing by replacing the html comments with your own content,
switching out the image url, adding modifiers, adding functionality and so
forth.
