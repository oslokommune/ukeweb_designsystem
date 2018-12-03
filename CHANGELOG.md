# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

See README.md for release description.

## [Unreleased] - YYYY-MM-DD

### Fixed
molecules-contact-contact_box: fixed faulty name syntax in sass.

### Added

### Changed

### Removed


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
