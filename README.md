# Oslo Styleguide

## Icons
If used directly in stylesheet characters might change so you need to use map `content: map-get(icons.$icons, "chevron-right")`
### Generate Icon Font
1. Add/remove icon SVG/s in assets directory `/src/assets/icons`
1. Run icon build script `npm run build:icons`
1. New fonts, CSS & docs are automatically generated
1. Commit, release & carry on
