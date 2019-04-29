# Oslo Styleguide

## Intro

This repository aims to only contain files related to consumption of components/patterns.

## Contributing

To aid in development of these patterns run `docker-compose up` and point your browser to `localhost:9000`.

## Consumption

### General

A cdn with the pre compiled css is on the way. Until it is, you'll have to use it as a node module, and have some way of compiling sass in your project. This repository does not have an entry file for all the sass files, so you will have to import each patterns sass file that you want to use manually in your projects sass entry file.

See the repositories postfixed with '\_example' for different ways of consuming the patterns. Some of the example repositories will show how to consume the twig files as well as the sass files directly, compiling the twig files either with javascript or PHP.

### Docs

See the visual representation of the patterns together with documentation and code [here](https://styleguide.oslo.kommune.no/).

### Util Classes

The style guide does not supply solutions for grid (you can use css-grid or any other grid system for that), but it does supply util classes for spacing, text size, coloring, animations and more.

Check out [this list](docs/utils) for all the util classes with descriptions.

## Development notes

- See customizable sass variables [here](docs/customization)
- To get a better understanding of how webforvaltningen divide its patterns into atoms, molecules and organisms, [read this](docs/atomic) description.
- To get consumer information for supporting legacy browsers, [read this](docs/legacyBrowserSupport) setup guide.
- To get tips and best practices for developing the Style guide, [read this](docs/bestPractises).
- If you work for UKE contributing to this repository, [read this](docs/workflow) for a detailed overview of the work flow.
- The style guide only logs changes to patterns and util classes, so use other classes, mixins, functions, variables etc at you own risk.
