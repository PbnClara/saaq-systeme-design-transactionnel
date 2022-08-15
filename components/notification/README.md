### SCSS

#### Mixins

| Name                       | Params         | Description                             |
|----------------------------|----------------|-----------------------------------------|
| inline-notification--color | $color: String | Applies given $color to border and icon |
| notification--color        | $color: String | Applies given $color to left border     |


#### Modifiers

Use these modifiers with `.sdt-inline-notification` class.

| Selector                         | Description                        |
|----------------------------------|------------------------------------|
| .sdt-inline-notification--error   | Apply error color to border and icon   |
| .sdt-inline-notification--success | Apply success color to border and icon |
| .sdt-inline-notification--info    | Apply info color to border and icon    |
| .sdt-inline-notification--warning | Apply warning color to border and icon |

Use these modifiers with `.sdt-toast-notification` class.

| Selector                         | Description                        |
|----------------------------------|------------------------------------|
| .sdt-toast-notification--error   | Apply error color on left border   |
| .sdt-toast-notification--success | Apply success color on left border |
| .sdt-toast-notification--info    | Apply info color on left border    |
| .sdt-toast-notification--warning | Apply warning color on left border |

#### Inline Notification types

Use one of these classes on the element after the paragraph with `.sdt-inline-notification__title` class

| Name                                | Description                                    |
|-------------------------------------|------------------------------------------------|
| .sdt-inline-notification__subtitle  | Displays a subtitle next to the title          |
| .sdt-inline-notification__paragraph | Displays a multiline paragraph under the title |


### JavaScript

#### Public Methods

| Name    | Params | Description                                                                       |
|---------|--------|-----------------------------------------------------------------------------------|
| remove  |        | Removes the component, deletes the instance, and removes document event listeners |
| release |        | Delete the instance                                                               |


#### Options

| Option                        | Default Selector             | Description                                               |
|-------------------------------|------------------------------|-----------------------------------------------------------|
| selectorInit                  | `[data-notification]`        | The selector to find instances of the component           |
| selectorButton                | `[data-notification-btn]`    | The selector to find the close button in the component    |
| eventBeforeDeleteNotification | `notification-before-delete` | Event before deleting the notification                    |
| eventAfterDeleteNotification  | `notification-after-delete`  | Event after deleting the notification                     |


### FAQ 

#### Using aria live regions and alert roles

Using `role="alert"` is an aggressive call to action that the prompts a screen reader user to take immediate action on something that changed in the UI. This is usually reserved for things that are important or time-sensitive like:

- An invalid value was entered into a form field 
- The user's login session is about to expire
- The connection to the server was lost, local changes will not be saved

Use the alert role sparingly and only in situations where the user's immediate attention is required. 
Dynamic changes that are less urgent should use a less aggressive method, such as `aria-live="polite"` or other live region roles. 

Don't use an alert role on all notifications.

By default, we recommend that error and warning notifications use `role="alert"`, while success and info notifications use `aria-live="polite"`. 
But as always, this will depend on the urgency of the notification. 

**Sources:**
- [Use the alert role - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
- [ARIA Live Regions - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
