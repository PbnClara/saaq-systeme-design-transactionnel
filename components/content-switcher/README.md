### SCSS

#### Modifiers

Modifiers are used with various classes for ContentSwitcherV2.

| Name                                           | Description                                                   | 
|------------------------------------------------|---------------------------------------------------------------|
| .sdt-content-switcher-v2__nav--hidden          | Applies specific styles to hide the narrow tab menu options   |
| .sdt-content-switcher-v2__nav-item--selected   | Applies specific styles to the currently selected tab item    |

### JavaScript

#### Public Methods

Methods are inherited from the original Content Switcher component

| Name      | Params                        | Description                                                                                                           |
|-----------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| setActive | item: `HTMLElement`, callback: `Function` | Uses `data-target` attribute to show a content panel using the given CSS selector. Non-active targets will be hidden. You can also pass in an optional callback function, see FAQ for details |
| release   |                               | Deletes the instance and removes document event listeners                                                             |

#### Options

| Option                 | Default Selector                             | Description                                                                            |
|------------------------|----------------------------------------------|----------------------------------------------------------------------------------------|
| selectorInit           | [data-content-switcher-v2]                   | The CSS selector to find content switcher containers                                   |
| selectorMenu           | .sdt-content-switcher-v2__nav                | The CSS selector to find the drop down menu used in narrow mode                        |
| selectorTrigger        | .sdt-content-switcher-v2-trigger             | The CSS selector to find the button to open the drop down menu used in narrow mode     |
| selectorTriggerText    | .sdt-content-switcher-v2-trigger-text        | The CSS selector to find the element used in narrow mode showing the selected item     |
| selectorButton         | .sdt-content-switcher-v2__nav-item           | The CSS selector to find item containers                                               |
| selectorButtonSelected | .sdt-content-switcher-v2__nav-item--selected | The CSS selector to find the selected item                                             |
| selectorLink           | .sdt-content-switcher-v2__nav-link           | The CSS selector to find the links in items                                            |
| classActive            | sdt-content-switcher-v2__nav-item--selected  | The CSS class for item's selected state                                                |
| classHidden            | sdt-content-switcher-v2__nav--hidden         | The CSS class for the drop down menu's hidden state used in narrow mode                |
| eventBeforeSelected    | content-switcher-v2-beingselected            | The name of the custom event fired before an item is selected                          |
| eventAfterSelected     | content-switcher-v2-selected                 | The name of the custom event fired after an item is selected                           |

#### Events

| Event Name                          | Description                                                                                                       |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| content-switcher-v2-beingselected   | The name of the custom event fired before an item is selected. Cancellation of this event stops selection of tab. |
| content-switcher-v2-selected        | The name of the custom event fired after an item is selected                                                      |
