# Options

You can control things like min-height of the patterns frame and which parts of the devtools gui you want to show by editing settings in the json file of your pattern.

The settings are put inside of a json object named "meta".

## Pattern

Put pattern options in meta.pattern in the json file of your pattern.

| Key              | Value            | Description                                                                       |
| ---------------- | ---------------- | --------------------------------------------------------------------------------- |
| tags             | Array of Strings | The strings will form tags that a user can search for to find your pattern        |
| frame.min-height | Number           | This number represent the minimum height of the frame that your pattern is inside |

## GUI

Control the devtools GUI by setting options on meta.gui in the json file of your pattern.

| Key               | Value            | Default                       | Description                                                                  |
| ----------------- | ---------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| tabs              | Array of Strings | ["docs","html","twig","data"] | Insert the tabs you want to show, or an empty array to hide all              |
| show-docs         | Boolean          | true                          | Show rendered markup documentation                                           |
| show-include-list | Boolean          | true                          | Show the list of twig files that is included or embeded in the patterns twig |
| show-asset-list   | Boolean          | true                          | Show the list of js and css assets of the pattern                            |

### Presets

Set GUI option presets in meta.gui.preset in the json file of your pattern.

| Value            | Description                                               |
| ---------------- | --------------------------------------------------------- |
| "global-pattern" | Hides the tabs, include list, asset list and the settings |
