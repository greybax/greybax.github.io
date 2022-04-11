# My VSCode settings

#vscode, #tools, #plugins, #english;

_November 06, 2016_

I'm using VSCode as my main code editor for a long time. 
This is a good open source project done by Microsoft, code based on [github](https://github.com/Microsoft/vscode).
And now it has more than 19K⭐️. 

Here I'd like to share my configs and plugin list for this editor.

## Configs

VSCode supports 2 settings file: 

* User Settings - _common settings for editor_
* Workspace Settings - _these settings can override user settings_

My ```settings.json``` file:

```json
// Place your settings in this file to override the default settings
{
    // Editor

    // The number of spaces a tab is equal to.
    "editor.tabSize": 2,
    // Controls whether the editor should render whitespace characters
    "editor.renderWhitespace": "all",
    // Controls whether the editor should render indent guides
    "editor.renderIndentGuides": true,
    
    // Workbench

    // Controls if opened editors should show in tabs or not.
    "workbench.editor.showTabs": false,
    
    // File Explorer

    // Number of editors shown in the Open Editors pane. Set it to 0 to hide the pane.
    "explorer.openEditors.visible": 5,

    // Search

    // Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the files.exclude setting.
    "search.exclude": {
        "**/node_modules": true,
        "**/jspm_packages": true,
        "**/bower_components": true
    },

    // Files

    // Controls auto save of dirty files. Accepted values:  "off", "afterDelay", "onFocusChange" (editor loses focus), "onWindowChange" (window loses focus). If set to "afterDelay", you can configure the delay in "files.autoSaveDelay".
    "files.autoSave": "onWindowChange",

    // Emmet

    // When enabled, emmet abbreviations are expanded when pressing TAB.
    "emmet.triggerExpansionOnTab": true,

    // Preferences used to modify behavior of some actions and resolvers of Emmet.
    "emmet.preferences": {},

    // Define profile for specified syntax or use your own profile with specific rules.
    "emmet.syntaxProfiles": {
        "javascript": "html",
        "typescript": "html"
    },

    // An array of languages where emmet abbreviations should not be expanded.
    "emmet.excludeLanguages": [],
    "typescript.check.tscVersion": false
}
```

## Plugins

Below I provide my plugin list which helps me every day in my work. 
Full list of plugins you can find on [VisualStudio Marketplace](https://marketplace.visualstudio.com/).

1. [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

> Visual Studio Code plugin that autocompletes npm modules in import statements.

2. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

> Visual Studio Code plugin that autocompletes filenames.

3. [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

> Integrates the [tslint](https://github.com/palantir/tslint) linter for the TypeScript language into VS Code.

4. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

> A VS Code extension to debug your JavaScript code in the Google Chrome browser, or other targets that support the Chrome Debugging Protocol.

5. [Annotator](https://marketplace.visualstudio.com/items?itemName=ryu1kn.annotator)

> Display git blame info along with your code. Can open the diff of a particullar commit from here.

6. [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

> Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX.

7. [Cordova Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools) (usefull only if you a working with Cordova)

> Code-hinting, debugging and integrated commands for Apache Cordova (PhoneGap). With added support for ionic framework.