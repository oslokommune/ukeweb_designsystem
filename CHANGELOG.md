# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

See README.md for release description.


## [Unreleased] - YYYY-MM-DD

### Fixed
* organisms-header-event: changed width of green box
* organisms-cards-card: changed font-weight in heading
* organisms-cards-listCard: changed font-weight in heading
* molecules-navigation-tags: removed margin around pattern

### Added

### Changed

### Removed


## [0.7.0] - 2018-12-07

### Fixed
* atoms-forms-checkbox: changed hover color
* atoms-social-icon: changed hover color
* molecules-content_display-expand_box: changed hover color
* molecules-navigation-navbar_menu: changed hover color
* molecules-navigation-tags: changed hover color
* molecules-social-icon_list: changed hover color
* organisms-global-footer: changed hover color
* organisms-global-header: changed hover color
* organisms-headings-promo: fixed z-index problem making the button not clickable.
* organisms-headings-promo: made promo 100 view height on mobile.

### Added
* global: added sass variable color-green-darker
* organisms-content_display-content_box: added optional tag field and optional link field


## [0.6.2] - 2018-12-05

### Fixed
* atoms-buttons-button: changed background color to green-dark.
* organisms-headings-promo: fixed issue with overlay affecting the logo.
* organisms-global-footer: changed link color to green-dark.
* organisms-global-header: fixed faulty css class for font size on title


## [0.6.1] - 2018-12-03

### Fixed
* molecules-contact-contact_box: fixed faulty name syntax in sass.


## [0.6.0] - 2018-11-29

### Fixed
* atoms-buttons-button: no need to pass button color/state.
* molecules-data_display-info_list: no need to pass button color/state.
* molecules-content_display-content_box: added twig blocks.
* organisms-headings-event: no need to pass button color/state.
* organisms-navigation-call_to_action: no need to pass button color/state.
* organisms-cards-card: added twig blocks and expanded docs.
* organisms-cards-shapeCard: added twig blocks and expanded docs.
* organisms-cards-listCard: added twig blocks and expanded docs.
* organisms-headings-event: added twig blocks.
* organisms-media-video: made poster image optional.
* global: made size-1 one a little bit smaller.

### Added
* atoms-icons-icon: added icon chevron right
* molecules-content_display-expand_box: new pattern.
* atoms-messages-alert: new pattern.
* atoms-forms-text: state field. see docs for text for details.
* molecules-content_display-content_box: added alert atom.
* organisms-media-video: added ratio modifiers.
* global: added color util classes.
* global: added state util classes.


### Changed
* atoms-buttons-button: changed button color class with button state class (non breaking change for twig consumers).
* organisms-cards-card: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).
* organisms-cards-shapeCard: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).
* organisms-cards-listCard: embedding content_box and expanding its blocks with with tags and search (non breaking change for twig consumers).


## [0.5.0] - 2018-10-31

### Changed
* Transitioned from prototype to Oslo Styleguide.
* Versioning reset.
