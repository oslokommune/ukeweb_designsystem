# Oslo Designsystem

## Releasing new versions

### Test

1. Merge pull request into test
2. Push test branch
3. CI/CD will make the test branch available at test.designsystem.ukeweb.io

### Production

1. Git pull
2. Update package.json with new version
3. Update CHANGELOG.md
4. Commit and push
5. Create new release at github.com with the same version as in package.json
6. CI/CD workflows will make new versioned CSS and font files available on CDN

## Icons

If used directly in stylesheet characters might change so you need to use map `content: map-get(icon-map.$icons, "chevron-right")`

### Generate Icon Font

1. Add/remove icon SVG/s in assets directory `/src/assets/icons`
2. Run icon build script `npm run build:icons`
3. New fonts, CSS & docs are automatically generated
4. Add new icons to general/icons/icons.html
5. Commit and carry on
