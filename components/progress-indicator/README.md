### SCSS

#### Modifiers

Use these modifiers with `.sdt-progress` class.

| Selector                       | Description                                    |
|--------------------------------|------------------------------------------------|
| .sdt-progress-step--current    | Applies styles for the current progress-step   |
| .sdt-progress-step--incomplete | Applies styles for an incomplete progress-step |
| .sdt-progress-step--complete   | Applies styles for a complete progress-step    |

### Javascript

#### Public Methods

| Name       | Params                   | Description                                                                                                                                                                                                                                                    |
|------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getSteps   |                          | Returns Array of Objects with `element` and `order` key/value pairs. The `element` key contains a step element. The `order` key is what order the step element is, order starts counting from 1 (the first step element) to whatever the last step element is. |
| getCurrent |                          | Returns an Object with data of the current step (`element` and `order` key/value pairs)                                                                                                                                                                        |
| setCurrent | newCurrentStep: `Number` | Changes the current step with the given `index` number. (ex. `setCurrent(0)` sets the first step as the current step)                                                                                                                                          |

#### Options

| Option                | Default Selector                 | Description                                         |
|-----------------------|----------------------------------|-----------------------------------------------------|
| `selectorInit`        | `[data-progress]`                | The selector to find the ProgressIndicator element. |
| `selectorStepElement` | `.sdt-progress-step`             | The selector to find the step element.              |
| `selectorCurrent`     | `.sdt-progress-step--current`    | The selector to find the step current step element. |
| `selectorIncomplete`  | `.sdt-progress-step--incomplete` | The selector to find incomplete step elements.      |
| `selectorComplete`    | `.sdt-progress-step--complete`   | The selector to find complete step elements.        |
| `classStep`           | `sdt-progress-step`              | ClassName for step element                          |
| `classCompleteStep`   | `sdt-progress-step--complete`    | ClassName for complete step element                 |
| `classIncompleteStep` | `sdt-progress-step--incomplete`  | ClassName for incomplete step element               |
| `classCurrent`        | `sdt-progress-step--current`     | ClassName for current step element                  |

#### Classes

| Name                             | Description                                         |
|----------------------------------|-----------------------------------------------------|
| `sdt-progress-step`              | The class for a step element                        |
| `sdt-progress-step--complete`    | The class for a complete step element               |
| `sdt-progress-step--incomplete`  | The class for an incomplete step element            |
| `sdt-progress-step--current`     | The class for a current step element                |

### FAQ

#### Adding or removing Progress steps

Once `ProgressIndicator` instance is initialized, simply add or remove Progress steps in the HTML. The JavaScript will automatically acommodate for any number of steps. A Progress step in HTML looks like this:

```html
<li class="sdt-progress-step sdt-progress-step--complete">
  <svg width="24px" height="24px" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12"></circle>
    <polygon points="10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6"></polygon>
  </svg>
  <p class="sdt-progress-label">Label 1</p>
  <span class="sdt-progress-line"></span>
</li>
```

Note that each progress step will need a modifier class. In the example above, it is `sdt-progress-step--complete`, but the JavaScript will set this to the appropriate modifier class relative to the current step as indicated by `sdt-progress-step--incomplete`.

#### How to set current Progress step 

Use the `setCurrent(index)` class method. The `index` number corresponds to a progress step.

```js
const instance = ProgressIndicator.init();

// Sets the first progress step as the current step
instance.setCurrent(0)

// Sets the second progress step as the current step
instance.setCurrent(1)

// Sets the third progress step as the current step
instance.setCurrent(2)
```

- All index numbers less than the current index will be complete
- All index numbers greater than the current index will be incomplete
