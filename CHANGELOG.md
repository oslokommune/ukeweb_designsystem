# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

See README.md for release description.

## [Unreleased] - YYYY-MM-DD

### Fixed

- molecules-data_display-icon_link: fixed ie style issue
- molecules-data_display-icon_link: fixed semantic tags
- atoms-links-link_button: set default color for visited state
- molecules-cards-card: set content_box in card to full width on mobile as default

### Added

- utils: added numbered spacing util classes from 1 to 7 (i.e osg-u-padding-top-3 or osg-u-margin-left-6 )
- utils: added spacing util classes for vertical spacing (i.e osg-u-margin-vertical-large or osg-u-padding-vertical-5)
- utils: added spacing util classes for spacing in all directions (i.e osg-u-margin-large or osg-u-padding-5)

### Removed

### Changed

- utils: changed naming of spacing util classes from "sides" to "horizontal" (i.e osg-u-padding-sides-small is now osg-u-padding-horizontal-small)

## [0.25.0] - 2019-05-27

### Fixed

- atoms-forms-text_field: changed foreground color in the outline modifier
- atoms-forms-text_field: fixed extra outline with the outline modifier

### Added

- atoms-forms-text_field: added optional autocomplete field

## [0.24.0] - 2019-05-23

### Fixed

- atoms-buttons-button: outline modifier stays outlined on hover
- atoms-links-link_button: outline modifier stays outlined on hover
- atoms-buttons-button: using normal link color on text on outline button
- atoms-links-link_button: using normal link color on text on outline link_button

### Changed

- atoms-buttons-button: using bem style for color modifiers (added one extra dash to color modifier classes)
- atoms-links-link_button: using bem style for color modifiers (added one extra dash to color modifier classes)

## [0.23.1] - 2019-05-20

### Added

- atoms-forms-text_field: added outline modifier

## [0.23.0] - 2019-05-15

### Removed

- molecules-data_display-icon_link: Replace the styleguide icon for a block

## [0.22.0] - 2019-05-14

### Fixed

- organisms-navigation-hero: Fixed naming of modifiers targeting tablet and up

- molecules-navigation-menu_list: fix background plus/minus of the button to be repeated in Firefox and reduce space between items in mobile view

### Added

- organisms-navigation-hero: Added osg-hero--center-mobile-only modifier for centering image on mobile

## [0.21.0] - 2019-05-10

### Fixed

- atoms-messages-alert: fixed missing icon when state was set to important

### Added

- molecules-navigation-menu_list: new pattern

### Changed

- multiple patterns: changed all variables containing dataattr / dataattrs to camel case, dataAttr / dataAttrs

## [0.20.0] - 2019-05-02

### Changed

- utils: changed names of all icon utils

## [0.19.1] - 2019-05-02

### Fixed

- small style fix

## [0.19.0] - 2019-05-02

### Added

- atoms-buttons-button: added outline modifier
- atoms-links-link_button: added outline modifier
- atoms-icons-icon: added documentation on how to use icon util classes to create different icons

### Removed

- atoms-icons-icon: removed all icon variants as they can be made by using icon util classes

### Changed

- devtools: upgraded to 0.8.1

## [0.18.0] - 2019-03-28

### Fixed

- utils: added font-weight to typography helpers (^osg-u-text- and ^osg-u-heading-)

### Changed

- organisms-messages-alert: made the button tag into an anchor tag with role=button to fix aria error

## [0.17.0] - 2019-03-28

### Fixed

- molecules-data_display-icon_link: (twig) Add the possibility to switch the icon in the icon list pattern

### Added

- docs: added instructions on the css standard

### Changed

- molecules-data_display-icon_link: Wrap in a link the content of the icon link

## [0.16.1] - 2019-03-28

### Fixed

- docs: added warning about needing access to the private devtools docker image
- organisms-messages-alert: allow use extra attributes and removed hardcoded text

## [0.16.0] - 2019-03-21

### Fixed

- dev: Added docker-compose.yml so you can run devtools directly from the styleguide repository
- all patterns: changed to bem css standard
- global styles: made text dark blue by default.
- global styles: made links dark blue with underline.
- documentation: changed twig docs to have tables showing the variant/modifiers.

### Added

- atoms-links-link_button: new pattern.
- organisms-data_display-simple_table: new pattern.
- organisms-messages-alert: new pattern.
- organisms-navigation-shape_hero: new pattern.
- organisms-navigation-hero: new pattern (replacing contact_person and story_preview).

### Removed

- atoms-messages-alert: removed pattern.
- atoms-text-ingress: removed pattern.
- molecules-navigation-tags: removed pattern.
- molecules-contact-contact_person: removed pattern.
- molecules-contact-contact_box: removed pattern.
- molecules-content_display-byline: removed pattern.
- organisms-cards-shape_card: removed pattern.
- organisms-navigation-story_preview: removed pattern.

### Changed

- util classes: Added -u to the prefix of all utils classes.
- util classes: Added -only postfix to the end of util classes with the -mobile postfix.
- util classes: Added -and-up to the end of the util classes with the -tablet and the -desktop postfix.
- atoms-forms-text: renamed to atoms-forms-text_field
- atoms-decorators-figure: Added block(s).
- atoms-decorators-shape: Added block(s).
- atoms-button-button: Added block(s) and refactored out things likely to be changed by consumers.
- molecules-content_display-content_box: Added block(s) and refactored out things likely to be changed by consumers.
- molecules-content_display-expand_box: Added block(s) and refactored out things likely to be changed by consumers.
- molecules-data_display-info_list: Added block(s) and refactored out things likely to be changed by consumers.
- organisms-cards-card: Added block(s) and refactored out things likely to be changed by consumers.
- organisms-cards-list_card: Added block(s) and refactored out things likely to be changed by consumers.
- organisms-headings-event: Added block(s) and refactored out things likely to be changed by consumers.
- organisms-headings-promo: Added block(s) and refactored out things likely to be changed by consumers.
- organisms-navigation-call_to_action: Added block(s) and refactored out things likely to be changed by consumers.

## [0.14.0] - 2019-02-06

### Fixed

- all twig patterns: better checks to ensure that optional fields can either not be passed in or be passed in with with a null value.
- atoms-buttons-button: added hover color.
- organisms-cards-card: fixed card being taller then its content.
- organisms-cards-shape_card: fixed card being taller then its content.

### Added

- atoms-icons-icon: added optional screen reader text.
- organisms-headings-event: added optional field stateText and modifier osg-m-with-state which adds an overlay over the picture with the given text

### Removed

- remove is-sr-only class in \_utils.sass.

### Changed

- organisms-global-footer: moved logos object into footer namespace (twig consumer only).

## [0.13.3] - 2019-01-24

### Fixed

- organisms-cards-listCard: added support for injecting content into contentBox footer(by added a call to parent)
- organisms-cards-shapeCard: added support for injecting content into contentBox footer(by added a call to parent)
- organisms-cards-card: added support for injecting content into contentBox footer(by added a call to parent)

## [0.13.2] - 2019-01-24

### Fixed

- content_display-content_box: more rigid variable checks on optional fields.

## [0.13.1] - 2019-01-24

### Fixed

- organisms-navigation-story_preview: more rigid variable checks on optional fields.

## [0.13.0] - 2019-01-23

### Added

- organisms-headings-event: new element (div.osg-event-caption) to show image caption below the info_list pattern on mobile. Now supports multiple caption lines on mobile.

### Changed

- organisms-headings-event: hiding figcaption on mobile (not a breaking change for twig consumers).
- organisms-navigation-story_preview: Moved the read more link from content box into the main story preview component.
- organisms-navigation-story_preview: Made the whole component a link if the link is defined, otherwise the component is a div and the read more text is not shown.

## [0.12.0] - 2019-01-08

### Fixed

- organisms-global-footer: Added background color to top domain link.

### Added

- atoms-decorators-shape: added optional title field to the anchor.
- atoms-social-icon: added optional title field to the anchor.
- molecules-social-icon_list: added title field to the brands.

### Changed

- molecules-search-search_bar: changed json field for textField, as it has changed name to text

## [0.11.0] - 2019-01-03

### Fixed

- molecules-content_display-expand_box: Fixed font size for title in mobile view.
- organisms-navigation-story_preview: changed font weight to 600

### Changed

- atoms-forms-text: changed namespace from textField to text.
- atoms-buttons-button: wrapped data-attrs in double-quotes to allow for multiple words .

## [0.10.0] - 2018-12-17

### Added

- molecules-content_display-expand_box: added option for using markup from contentBox

### Changed

- molecules-content_display-expand_box: changed footer link to use content box read more link, removed styling for read more link from expandBox as it now comes from contentBox

## [0.9.0] - 2018-12-17

### Fixed

- molecules-search-search_bar: Fixed issue with iphone zooming in on search-box.
- organisms-navigation-story_preview: removed code for sizing the story_preview

### Changed

- organisms-cards-card: removed unused markup which was confusing screen readers
- organisms-cards-card: removed aria-hidden tags which was confusing screen readers
- organisms-cards-list_card: removed unused markup which was confusing screen readers
- organisms-cards-list_card: removed aria-hidden tags which was confusing screen readers
- atoms-text-quote: added optional link around cite

## [0.8.0] - 2018-12-11

### Fixed

- organisms-global-header: removed hover color
- organisms-header-event: changed width of green box
- organisms-cards-card: changed font-weight in heading
- organisms-cards-listCard: changed font-weight in heading
- molecules-navigation-tags: removed margin around pattern
- organisms-navigation-story_preview: fixed css to apply to the correct parts of content_box
- atoms-buttons-button: increased padding on button
- molecules-navigation-navbar_menu: decreased spacing between elements
- organisms-navigation-call_to_action: changed padding and max width

### Added

### Changed

- organisms-story-preview: Updated to latest design

### Removed

## [0.7.0] - 2018-12-07

### Fixed

- atoms-forms-checkbox: changed hover color
- atoms-social-icon: changed hover color
- molecules-content_display-expand_box: changed hover color
- molecules-navigation-navbar_menu: changed hover color
- molecules-navigation-tags: changed hover color
- molecules-social-icon_list: changed hover color
- organisms-global-footer: changed hover color
- organisms-global-header: changed hover color
- organisms-headings-promo: fixed z-index problem making the button not clickable.
- organisms-headings-promo: made promo 100 view height on mobile.

### Added

- global: added sass variable color-green-darker
- organisms-content_display-content_box: added optional tag field and optional link field

## [0.6.2] - 2018-12-05

### Fixed

- atoms-buttons-button: changed background color to green-dark.
- organisms-headings-promo: fixed issue with overlay affecting the logo.
- organisms-global-footer: changed link color to green-dark.
- organisms-global-header: fixed faulty css class for font size on title

## [0.6.1] - 2018-12-03

### Fixed

- molecules-contact-contact_box: fixed faulty name syntax in sass.

## [0.6.0] - 2018-11-29

### Fixed

- atoms-buttons-button: no need to pass button color/state.
- molecules-data_display-info_list: no need to pass button color/state.
- molecules-content_display-content_box: added twig blocks.
- organisms-headings-event: no need to pass button color/state.
- organisms-navigation-call_to_action: no need to pass button color/state.
- organisms-cards-card: added twig blocks and expanded docs.
- organisms-cards-shapeCard: added twig blocks and expanded docs.
- organisms-cards-listCard: added twig blocks and expanded docs.
- organisms-headings-event: added twig blocks.
- organisms-media-video: made poster image optional.
- global: made size-1 one a little bit smaller.

### Added

- atoms-icons-icon: added icon chevron right
- molecules-content_display-expand_box: new pattern.
- atoms-messages-alert: new pattern.
- atoms-forms-text: state field. see docs for text for details.
- molecules-content_display-content_box: added alert atom.
- organisms-media-video: added ratio modifiers.
- global: added color util classes.
- global: added state util classes.

### Changed

- atoms-buttons-button: changed button color class with button state class (non breaking change for twig consumers).
- organisms-cards-card: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).
- organisms-cards-shapeCard: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).
- organisms-cards-listCard: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).

## [0.5.0] - 2018-10-31

### Changed

- Transitioned from prototype to Oslo Styleguide.
- Versioning reset.
