# Customization

Oslo Styleguide provides some variables that can be overridden to suit your project.

## Paths

These should be altered to tell your build system where the fonts are. When using webpack with sass-loader and url-resolve you point these to the folders in your styleguide node module like this:

´´´sass
$osg-image-path: '~styleguide/src/assets/images'
$osg-font-path: '~styleguide/src/assets/fonts'
´´´

before importing stylesheets from the Styleguide.

| Name             | Default          | Decription                            |
| ---------------- | ---------------- | ------------------------------------- |
| \$osg-image-path | '../../images'   | Path to the styleguides images folder |
| \$osg-font-path  | '../../../fonts' | Path to the styleguides fonts folder  |

## Spacing

These are used to make spacing util classes. See the [utils docs](../utils) to see what they are.

| Name               | Default | Decription                                               |
| ------------------ | ------- | -------------------------------------------------------- |
| \$osg-space-none   | 0       | To remove padding/margin with util classes. Should be 0. |
| \$osg-space-tiny   | 10px    | Tiny padding/margin util classes                         |
| \$osg-space-small  | 20px    | Small padding/margin util classes                        |
| \$osg-space-medium | 30px    | Medium padding/margin util classes                       |
| \$osg-space-large  | 40px    | Large padding/margin util classes                        |
| \$osg-space-huge   | 60px    | Huge padding/margin util classes                         |

## Media Queries

These variable settings mimicks equivalent settings in Bulma

| Name             | Default                   | Decription                                                   |
| ---------------- | ------------------------- | ------------------------------------------------------------ |
| \$osg-gap        | 32px                      | Used in breakpoint settings to account for container padding |
| \$osg-tablet     | 769px                     | Tablet breakpoint                                            |
| \$osg-desktop    | 960px + (2 \* \$osg-gap)  | Desktop breakpoint                                           |
| \$osg-widescreen | 1152px + (2 \* \$osg-gap) | Widescreen breakpoint                                        |
| \$osg-fullhd     | 1344px + (2 \* \$osg-gap) | Full HD breakpoint                                           |
