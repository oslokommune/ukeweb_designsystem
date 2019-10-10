# Util Classes

- All util classes are prefixed with osg-u-.
- All variable class name postfixes are documented below the class descriptions.
- Variable name postfixes are displayed as text in square brackets (ie: [name of color name]).

## General

These classes should be added to any element to set styles directly to it.

### Color

| Name                              | Description                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| .osg-u-color-text-[color]         | Specifies a color for text with a color from the official color palette                            |
| .osg-u-color-bg-[color]           | Specifies a color for the background of the element with a color from the official color palette   |
| .osg-u-color-[state color]        | Specifies a color for the background and text with colors from the official state system           |
| .osg-u-text-grayscale-[grayscale] | Specifies a gray color for text with a color from the official gray scale                          |
| .osg-u-bg-grayscale-[grayscale]   | Specifies a gray color for the background of the element with a color from the official gray scale |

### Text

| Name                         | Description                              |
| ---------------------------- | ---------------------------------------- |
| .osg-u-text-is-[font weight] | Specifies a font weight for the element  |
| .osg-u-text-is-italic        | Makes the text style italic              |
| .osg-u-header-[typography]   | Specifies a predefined header typography |
| .osg-u-text-[typography]     | Specifies a predefined text typography   |

### Spacing

| Name                                                   | Description                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| .osg-u-padding-[spacing size]                          | Adds padding to the top, bottom, and sides of the element                   |
| .osg-u-margin-[spacing size]                           | Adds margin to the top, bottom, and sides of the element                    |
| .osg-u-padding-bottom-[spacing size]                   | Adds padding to the bottom of the element                                   |
| .osg-u-margin-bottom-[spacing size]                    | Adds margin to the bottom of the element                                    |
| .osg-u-padding-top-[spacing size]                      | Adds padding to the top of the element                                      |
| .osg-u-margin-top-[spacing size]                       | Adds margin to the top of the element                                       |
| .osg-u-padding-left-[spacing size]                     | Adds padding to the left of the element                                     |
| .osg-u-margin-left-[spacing size]                      | Adds margin to the left of the element                                      |
| .osg-u-padding-right-[spacing size]                    | Adds padding to the right of the element                                    |
| .osg-u-margin-right-[spacing size]                     | Adds margin to the right of the element                                     |
| .osg-u-padding-sides-[spacing size]                    | Adds padding to the left and right of the element                           |
| .osg-u-margin-sides-[spacing size]                     | Adds margin to the left and right of the element                            |
| .osg-u-padding-bottom-[spacing size]-[screen size]     | Adds padding to the bottom of the element for a specific breakpoint         |
| .osg-u-margin-bottom-[spacing size]-[screen size]      | Adds margin to the bottom of the element for a specific breakpoint          |
| .osg-u-padding-top-[spacing size]-[screen size]        | Adds padding to the top of the element for a specific breakpoint            |
| .osg-u-margin-top-[spacing size]-[screen size]         | Adds margin to the top of the element for a specific breakpoint             |
| .osg-u-padding-left-[spacing size]-[screen size]       | Adds padding to the left of the element for a specific breakpoint           |
| .osg-u-margin-left-[spacing size]-[screen size]        | Adds margin to the left of the element for a specific breakpoint            |
| .osg-u-padding-right-[spacing size]-[screen size]      | Adds padding to the right of the element for a specific breakpoint          |
| .osg-u-margin-right-[spacing size]-[screen size]       | Adds margin to the right of the element for a specific breakpoint           |
| .osg-u-padding-horizontal-[spacing size]-[screen size] | Adds padding to the left and right of the element for a specific breakpoint |
| .osg-u-margin-horizontal-[spacing size]-[screen size]  | Adds margin to the left and right of the element for a specific breakpoint  |
| .osg-u-padding-vertical-[spacing size]-[screen size]   | Adds padding to the top and bottom of the element for a specific breakpoint |
| .osg-u-margin-vertical-[spacing size]-[screen size]    | Adds margin to the top and bottom of the element for a specific breakpoint  |

### Animation

| Name                         | Description                                                |
| ---------------------------- | ---------------------------------------------------------- |
| .osg-u-animate-scale-up      | Fades element in while it scales up from 70% size to 100%. |
| .osg-u-animate-scale-in      | Scales element up from 0% size to 100%                     |
| .osg-u-animate-scale-in-text | Fades text in while scaling it from 90% size to 100%       |

### Shortcuts

| Name                                   | Description                                 |
| -------------------------------------- | ------------------------------------------- |
| .osg-u-direction-[flex direction name] | Shortcut class for setting flex-direction   |
| .osg-u-text-[text alignment name]      | Shortcut class for setting text-align value |

### Icons

| Name                    | Description                 |
| ----------------------- | --------------------------- |
| .osg-u-icon-[icon name] | Specifies a predefined icon |

## Body Classes

These optional utility classes should be added to the body tag, when needed.

| Name                      | Description                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| osg-u-header-overlay      | Will absolute position the header organism and overlay it with the page content. Used for positioning the header above the promo pattern |
| osg-u-header-inverted     | Change color of the header organism to white                                                                                             |
| osg-u-header-no-underline | Remove underline from header organism                                                                                                    |

## Options

### Colors

- beige: (#f8f0dd)
- beige-dark: (#d0bfae)
- black: (#2c2c2c)
- blue: (#6fe9ff)
- blue-dark: (#2a2859)
- blue-light: b3f5ff
- green: (#43f8b6)
- green-dark: (#034b45)
- green-light: (#c7f6c9)
- grey: (#f2f2f2)
- grey-light: (#f9f9f9)
- red: (#ff8274)
- yellow: (#f9c66b)

#### Context Aware Colors

These colors should only be used in the context represented by its name

- blue-hover: (#1f42aa)
- purple-visited: (#8d50b1)
- purple-visited-light: (#e0adff)

### State Colors

Background and text color that is compliant to WCAG 2.0

- muted (bg: grayscale-10, text: grayscale-80)
- primary (bg: blue-light, text: green-dark)
- success (bg: green-light, text: green-dark)
- warning (bg: orange, text: green-dark)
- danger (bg: red, text: green-dark)

### Font Weights

- light (300)
- regular (500)
- medium (700)
- bold (900)

### Spacing Sizes

#### Named Spacing Sizes

- none (0)
- tiny (10px)
- small (20px)
- medium (30px)
- large (40px)
- huge (60px)

#### Numbered Spacing Sizes

- 1 (5px)
- 2 (10px)
- 3 (15px)
- 4 (30px)
- 5 (50px)
- 6 (75px)
- 7 (100px)

### Screen Sizes

Mobile first break points.

- mobile-only (from 0 to 768 pixels)
- tablet-and-up (from 769 pixels and up)
- desktop-and-up (from 1088 pixels and up)

### Typography

Number representing standardized Typographies. Typography 1 is the biggest, 2 is one step lower etc.

Each size number has one font-size for mobile and one for tablet and up and one for tablet and up. The bigger the screen the bigger the font-size.

The sizes are specified in rem, and its pixel equivalent (assuming a root/body/html size of 16px) is represented after the slash in the tables.

The typography classes also specifies values for letter-spacing and line-height. Text typographies have more letter-spacing and line-height than the header typographies.

#### Header Typographies

| Name | Mobile            | Tablet (and up)   | Desktop (and up)  | Font weight   |
| ---- | ----------------- | ----------------- | ----------------- | ------------- |
| 1    | 1.75 rem / 28 px  | 2.5 rem / 40 px   | 3.375rem / 54 px  | regular / 400 |
| 2    | 1.5 rem / 24 px   | 1.875 rem / 30 px | 2.25 rem / 36 px  | regular / 400 |
| 3    | 1.375 rem / 22 px | 1.625 rem / 26 px | 1.875 rem / 30 px | regular / 400 |
| 4    | 1.125 rem / 18 px | 1.375 rem / 22 px | 1.5 rem / 24 px   | medium / 500  |
| 5    | 1 rem / 16 px     | 1 rem / 16 px     | 1.125 rem / 18 px | medium / 500  |

#### Text Typographies

| Name | Mobile            | Tablet (and up)   | Desktop (and up)  | Font weight  |
| ---- | ----------------- | ----------------- | ----------------- | ------------ |
| 1    | 1.25 rem / 20 px  | 1.5 rem / 24 px   | 1.875 rem / 30 px | light / 300  |
| 2    | 1.25 rem / 20 px  | 1.375 rem / 22 px | 1.5 rem / 24 px   | light / 300  |
| 3    | 1.125 rem / 18 px | 1.125 rem / 18 px | 1.25 rem / 20 px  | light / 300  |
| 4    | 1 rem / 16 px     | 1.125 rem / 18 px | 1.125 rem / 18 px | medium / 500 |
| 5    | 1 rem / 16 px     | 1.125 rem / 18 px | 1.125 / 18 px     | light / 300  |
| 6    | 0.875 rem / 14 px | 0.875 rem / 14 px | 0.875 rem / 14 px | medium / 500 |
| 7    | 0.875 rem / 14 px | 0.875 rem / 14 px | 0.875 rem / 14 px | light / 300  |

### Grayscales

Number representing percentage of darkness starting from white. So the higher the number, the darker the scale of gray.

- 10
- 20
- 30
- 40
- 50
- 60
- 70
- 80
- 90

### Icons

Custom svg icons, set as background image.

- recycling
- swingset
- house-heart
- fire-emblem
- user
- chevron-right
- 24h
- drone
- letter
- filter
- bus
- handicap
- heart-plus
- dog
- cafe
- calendar
- location-pin
- museum
- park
- hoist
- restaurant
- coin-stacks
- backpack
- magnifying-glass
- street-vendor
- bike
- toilet
- tram
- water-faucet

### Text Alignments

Helpers for setting text-align value

- left
- right
- center

### Flex directions

Helpers for setting flex-direction value

- row-reverse
- column-reverse
