# Oslo Designsystem changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - dd.mm.yyyy

### Added

- Added VUE apps names to the components so they are easier to identify in Vue devtools applist.

### Fixed

- Fixed links on portrait cards to improve screen reader capabilities.

## [1.1.0] - 16.02.2024

### Added

- Added examples of more geoJSON structures in the map component.
- Update styles for the popup in the map component.
- Added security, contribution and license files to accomodate github community standards.

### Changed

- Changed hover colour on button-text button.
- Change to OsloSans font, increase spacing and size scaling of datepicker vue component.

### Fixed

- Fixed spacing around links and buttons in portrait card on all breakpoints.
- Fixed hardcoded references to use s3.dualstack for IPv6 support.
- Prevent plus/minus icon to show in other variants than filter.
- Fixed a scope issue where blue-dark and green-dark modifiers in Search seasons did not receive the correct styling.
- Fixed hexcodes and class names for colors.
- Fixed typo in checkbox component and heading style of 'important' section.

## [1.0.5] - 01.11.2023

### Added

- Added underline to radio button's text on hover.
- Added aria-required property to checkbox, textarea and input VUE components.

### Changed

- Change background color and text for default state of radio button.

## [1.0.4] - 30.10.2023

### Changed

- Change getting started -> bundle to refer to npm instead of github
- Change "pages" reference to "templates"
- Removed column gap on service header.

### Fixed

- Fix arrow overlapping text in small breakpoint of Accordion.

## [1.0.3] - 25.10.2023

### Fixed

- Remove font styles from lists and update the list's clean variant padding. This fixes the lists styles in the Banner component.

## [1.0.2] - 23.10.2023

### Fixed

- Fix issue with radio button that didn't keep the checked style after it was checked
- Fix a bug that prevents generate certain grid classes that were extended as a placeholder.
- Fix unintended padding and border on accordion

### Added

- Added icon for X.

## [1.0.1] - 03.10.2023

### Added

- Added missing ods.js / ods.scss in src folder

### Changed

- Changed consume -> packages to show use of dualstack to support both IPv4 and IPv6.

## [1.0.0] - 27.09.2023

### Added

- Added stylelint and eslint. Refactors all code according to rulesets.
- Added ambulance icon.
- Added a new variant of the yellow color, yellow-60.

### Changed

- Changed dispatchEvent to dispatchCustomEvent and decoupled from code for re-usability
- Changed spacing on list component from 4px to 8px according to Figma.
- Changed contribute "clean" page to better help contributors
- Changed contribute "page" page to better help contributors
- Changed documentation on contribution/basic page
- Changed folder and navigation structure for pages and templates
- Changed folder and navigation structure for colors
- Changed contactpoints-box in split section
- Changed list text size or weight according to Figma rules
- Changed display of landscape card to reflect actual use

### Fixed

- Fixed the grid on the Overview tab of these components for small breakpoint: fieldset, input, search, checkbox, radiobutton and button.
- Fixed BEM format and issue in the developer tab of input counter component.
- Fixed the distorted appearance of the search seasons icon in iOS Safari.
- Fixed broken link on collapsible page.
- Fixed misspelled breakpoint on landscape card
- Fixed broken hamburgermenu on small breakpoint
- Fixed missing font weight on landscape card label

### Removed

- Removed "Oslo" folder and files
- Removed "Palette" folder
- Removed link chevron left variant
- Removed landscape card large variant

## [0.99.106] - 01-06-2023

### Added

- Sets charset to utf-8 for sass.
- Added do not track and sandbox example and information to video component.
- Added examples of state on breadcrumb and link components.

### Changed

- **Breaking change:** Changes in the collapsible infobox markup to improve accessibility. The HTML has to be updated to use a `<button>` instead of a `<a>`. And the tabindex must be removed.
- **Breaking change:** Radiobutton gets fontweight medium when checked. The HTML has to be updated accordingly.

### Fixed

- Fixed a bug where wrong class for italic style was used on typography when switching between normal and italic style.
- Added standalone modifier to icon for a "no spacing on either side" option.
- Changes hover color of menu button in small breakpoint from yellow border to gray background.
- Fixed alignment of days in datepicker that looked missaligned on iPhone and iPad.
- Fixed color contrast on hover the current day in datepicker.
- Fixed wrong color on focus state in search seasons.
- Fixed font weight and size on xs card.

## [0.99.105] - 28-04-2023

### Added

- Add radiobutton to fieldset component.

### Fixed

- Fix position of icon arrow in select component.
- Fix alignment of cross icon in fieldset collapsible.
- Update search markup in header and employee search.

## [0.99.104] - 19-04-2023

### Added

- Add icon breakpoint classes and documentation accordingly.

### Fixed

- Hopefully fixed a bug where button became oval on iPhone (physical device only).

### Changed

- Implements design version 1.2 of Search Seasons.
- Updated colours for status message.

## [0.99.103] - 11-04-2023

### Fixed

- Update status message markup in the vue map component.
