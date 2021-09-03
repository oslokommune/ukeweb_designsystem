# Oslo style guide

## Releasing new versions

### Test

1. Push to main
2. To make test version available see devtools

### Production

1. Update package.json with new version
2. Update CHANGELOG.md
3. Create new release at github.com with the same version as in package.json
4. CI/CD workflows will make new versioned CSS and font files available on CDN

## Icons

If used directly in stylesheet characters might change so you need to use map `content: map-get(icons.$icons, "chevron-right")`

### Generate Icon Font

1. Add/remove icon SVG/s in assets directory `/src/assets/icons`
2. Run icon build script `npm run build:icons`
3. New fonts, CSS & docs are automatically generated
4. Commit and carry on
