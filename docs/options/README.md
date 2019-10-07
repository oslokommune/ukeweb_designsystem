# Options

You can control things like min-height of the patterns frame and which parts of the devtools gui you want to show by editing settings in the json file of your pattern.

The settings are put inside of a json object named "devtools".

| Name                                    | Type    | Default | Description                                                                 |
| --------------------------------------- | ------- | ------- | --------------------------------------------------------------------------- |
| frame.min-height                        | String  | ""      | CSS compatible min-height value (f.ex "500px")                              |
| modifiers                               | Array   | []      | List of css classes that the user should be able to add to the pattern      |
| preset                                  | String  | ""      | Name of a supported settings preset to alter a set of setting defaults      |
| sections.docs.active                    | Boolean | true    | Set the docs tab to show as active by default                               |
| sections.docs.visible                   | Boolean | true    | Show the docs tab                                                           |
| sections.accessibility.active           | Boolean | false   | Set the accessibility (A11Y) tab to show as active by default               |
| sections.accessibility.visible          | Boolean | true    | Show the accessibility (A11Y) tab                                           |
| sections.html.active                    | Boolean | false   | Set the html tab to show as active by default                               |
| sections.html.visible                   | Boolean | true    | Show the html tab                                                           |
| sections.json.active                    | Boolean | false   | Set the json (data) tab to show as active by default                        |
| sections.json.visible                   | Boolean | true    | Show the json (data) tab                                                    |
| sections.twig.active                    | Boolean | false   | Set the twig tab to show as active by default                               |
| sections.twig.visible                   | Boolean | true    | Show the twig tab                                                           |
| settings.visible                        | Boolean | true    | Show the settings area                                                      |
| settings.backgroundColor                | String  | ""      | CSS compatible color value to set to the background of the rendered pattern |
| settings.backgroundSolid                | Boolean | false   | Set the background of the pattern to a solid color                          |
| settings.contentPlaceholders            | Boolean | false   | Show content placeholders                                                   |
| settings.fullscreen                     | Boolean | false   | Whether to show the pattern in fullscreen mode                              |
| settings.ruler                          | Boolean | true    | Show height and width indicator rulers                                      |
| settings.sections.configuration.visible | Boolean | true    | Show the configutation section                                              |
| settings.sections.title.visible         | Boolean | true    | Show the patterns title                                                     |
| settings.selectedModifiers              | Array   | []      | List of active modifiers                                                    |
| settings.viewMode.single                | Boolean | true    | Show only the pattern in the pattern view                                   |
| settings.viewMode.grid                  | Boolean | false   | Show the pattern repeated in a grid                                         |
| settings.viewMode.random                | Boolean | false   | Show the pattern in a grid with other randomly selected patterns            |
| settings.viewSize.full                  | Boolean | true    | Set the width of the patterns view to full/fluid                            |
| settings.viewSize.desktop               | Boolean | false   | Set the width of the patterns view to the width of the desktop break point  |
| settings.viewSize.tablet                | Boolean | false   | Set the width of the patterns view to the width of the tablet break point   |
| settings.viewSize.mobile                | Boolean | false   | Set the width of the patterns view to the width of the mobile break point   |

### Presets

Set GUI option presets in devtools.preset in the json file of your pattern.

| Value   | Description                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------- |
| "clean" | Hides the the settings area, the tabs, the include list, the asset list, and sets a solid white background color |
