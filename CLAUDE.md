# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Oslo Designsystem (`@oslokommune/oslo-designsystem`) — a UI component library for Oslo kommune. Published on npm. Documentation site: https://designsystem.oslo.kommune.no/

This is a **source library**, not a standalone app. There is no dev server or bundler here. The companion devtools/documentation site lives in a separate repo (`oslokommune/ukeweb_designsystem_devtools`).

## Commands

```bash
npm run lint              # Run both eslint and stylelint
npm run eslint            # Lint JS/Vue files in src/
npm run stylelint         # Lint SCSS files in src/
npm run format            # Run Prettier
npm run build:icons       # Full icon pipeline: minimize SVGs → generate sprite, font, and JSON map
```

There are no tests. There is no dev server (preview happens via the separate devtools repo).

## Architecture

### Component structure

Each component in `src/components/` follows one of three patterns:

1. **CSS-only** (most components): `component.html` + `component.scss` + `component.json`
2. **Interactive vanilla JS**: adds `component.js` (exports object with `init/bindAll/unbindAll`) + `component.init.js` (calls init on DOMContentLoaded)
3. **Vue 3** (pagination, map, form inputs, image carousel): `.vue` Single File Components using Options API

`component.json` contains metadata (version, search tags) used by the devtools site. `component.html` contains example markup for documentation.

### SCSS conventions

- **BEM naming** enforced by stylelint: block = `ods-{component}`, elements = `__`, modifiers = `--`
- Design tokens live in `src/system/` — imported via `@use "system/colors"`, `@use "system/breakpoints"`, etc.
- Responsive: `@include breakpoints.medium { ... }` and `@include breakpoints.large { ... }`
- Spacing/typography use SCSS placeholder extends: `@extend %ods-padding-horizontal-4`, `@extend %ods-text--size-kilo`
- Typography scale uses NATO phonetic alphabet naming (alfa through kilo)
- Uses `@use`/`@forward` module system (not `@import`)

### Entry points and packages

- `src/ods.scss` / `src/ods.js` — main entry points, import from `src/packages/complete/`
- `src/packages/complete/` — full bundle (common + general + components)
- `src/packages/minimum/` — lighter bundle (common + icons/grid + components)
- `src/packages/devtools/` — full system + documentation pages + templates

### Icon pipeline

SVG sources in `src/assets/icons/` → `build:icons` runs SVGO, then generates: icon font files (in `src/assets/fonts/`), SVG sprite, SCSS character map (`src/system/_icon-map.scss`), and JSON map. Fantasticon config: `.fantasticonrc.js`.

### CI

GitHub Actions runs `npm audit --audit-level high` → eslint → stylelint on push to `test` branch, then triggers devtools deployment. Releases are cut via GitHub releases (tag-based).

## Code style

- Prettier: `printWidth: 400`, `singleQuote: true`
- EditorConfig: 2-space indent, LF, UTF-8, trim trailing whitespace
- All CSS classes prefixed with `ods-`
- Vue components named `Ods{ComponentName}`, use Options API
