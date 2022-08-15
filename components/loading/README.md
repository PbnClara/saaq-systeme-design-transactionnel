### SCSS

#### Modifiers

Use these modifiers with `.sdt-loading` class.

| Selector                   | Description                              |
|----------------------------|------------------------------------------|
| .sdt-loading--small        | Class for small loading spinner          |
| .sdt-loading--stop         | Class for stopping the loading animation |
| .sdt-loading-overlay--stop | Class for hiding the overlay             |

### JavaScript

#### Public Methods

| Name     | Params           | Description                                                 |
|----------|------------------|-------------------------------------------------------------|
| release  |                  | Deletes the instance                                        |
| set      | active : Boolean | Sets the active/inactive state                              |
| toggle   |                  | Toggles active/inactive state                               |
| isActive |                  | Returns current state                                       |
| end      |                  | Runs end animation and then delete the element from the DOM |

#### Options

| Option                  | Default Selector          | Description                                                      |
|-------------------------|---------------------------|------------------------------------------------------------------|
| selectorInit            | [data-loading]            | The CSS selector to find the loading component                   |
| selectorLoadingOverlay  | .sdt-loading-overlay      | The selector for the loading overlay.                            |
| classLoadingOverlayStop | sdt-loading-overlay--stop | The class for the loading overlay's stopped state.               |  
| active                  | true                      | A boolean value representing the initial state of the component. |
