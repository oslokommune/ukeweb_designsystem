# Oslo Styleguide
## Intro
This repo aims to only contain files related to comsumtion of components/patterns.

## Contributing
To aid in development of these patterns, clone the repo 'styleguide_devtools' and run
``` shell
docker-compose up
```

## Consumption
A cdn with the precompiled css is on the way. Untill it is, you'll have to use it as a node module, and have some way of compiling sass in your project. This repo does not have an entry file for all the sass files, so you will have to import each patterns file that you want to use manually in your projects sass entry file.

See the repos postfixed with '_example' for different ways of consuming the patterns. Some of the example repos will show how to consume the twig files as well as the sass files directly, compiling the twig files either with javascript or PHP.

## Development notes
* To get a better understanding of how webforvaltningen divide its patterns into atoms, molecules and organisms, [read this](docs/atomic) description.
* To get consumer information for supporting legacy browers, [read this](docs/legacyBrowserSupport) setup guide.
* To get tips and best practises for developing the Styleguide, [read this](docs/bestPractises).
* If you work for UKE contributing to this repo, [read this](docs/workflow) for a detailed overview of the work flow.

