### JavaScript

The date picker is built on top of [Flatpickr](https://chmln.github.io/flatpickr/), so the [events](https://chmln.github.io/flatpickr/events/) and [config options](https://chmln.github.io/flatpickr/options/) that come with Flatpickr is therefore available to the date picker. This includes methods for setting a min date, max date, disabling date(s), specifiying a range of dates, and more.

#### Public Methods

| Name    | Params  | Description          |
|---------|---------|----------------------|
| release |         | Deletes the instance |

#### Options

| Option                      | Default Selector                    | Description                                           |
|-----------------------------|-------------------------------------|-------------------------------------------------------|
| selectorInit                | [data-date-picker]                  | Element for initializing instance                     |
| selectorDatePickerInput     | [data-date-picker-input]            | Input element                                         |
| selectorDatePickerInputFrom | [data-date-picker-input-from]       | For ranged calendars only: The "From date" input element  |
| selectorDatePickerInputTo | [data-date-picker-input-to]       | For ranged calendars only: The "To date" input element  |
| selectorDatePickerIcon | [data-date-picker-icon]       | Calendar icon  |
| classCalendarContainer | .sdt-date-picker__calendar       | Class selector for the calendar container  |
| classMonth | .sdt-date-picker__month       | Class selector for the calendar month  |
| classWeekdays | .sdt-date-picker__weekdays       | Class selector for the calendar weekdays  |
| classDays | .sdt-date-picker__days       | Class selector for the calendar days  |
| classWeekday | .sdt-date-picker__weekday      | Class selector for a calendar weekday  |
| classDay | .sdt-date-picker__day       | Class selector for a calendar day  |
| attribType | data-date-picker-type       | Specifies the calendar mode (single or range) |
| dateFormat | 'm/d/Y' | The date format given to the calendar instance |


### FAQ 

#### Using and understanding Date Picker

There are 3 different date picker types:

| Type | data-date-picker-type |
|--|--|
| A simple date picker without a calendar | No data attributes needed |
| A single date picker | [data-date-picker-type="single"] |
| A ranged date picker | [data-date-picker-type="range"] |

**The simple date picker** is a text input without a calendar. You can specify the pattern for the text input to make sure the user enters the correct date format. The default regex pattern that ships with the
simple date picker is \d{4}/\d{1,2} ('yyyy/mm' for short date pickers) and \d{4}/\d{1,2}/\d{1,2} ('yyyy/mm/dd' for strandard date pirckers). The simple date picker does not require any JavaScript.

**The single date picker** is a text input with a calendar instance attached to it. It also ships with a calendar icon inside the input field. The calendar will open when the input is focused, and the user can both type in a date or select a day from the calendar. The single date picker requires JavaScript, so the data attributes `data-date-picker` and `data-date-picker-type="single"` are required on the parent div, and the data attribute `data-date-picker-input` is required on the input field.

**The ranged date picker** has two text inputs with a ranged calendar instance attached to them. The ranged date picker requires JavaScript, so the data attributes `data-date-picker` and `data-date-picker-type="range"` are required on the parent div, and the data attributes `data-date-picker-input-from` and `data-date-picker-input-to` are required on the two input fields.

**NEW**: It is now possible to impose a display format to single and ranged Date Pickers in their HTML definition using the `date-format` attribute in the div identified with `data-date-picker` attribute. Date formatting tokens are define in [the following page](https://flatpickr.js.org/formatting/)

#### Localization

Date Picker supports localization, and you can specify the date format by overriding the component option `dateFormat`. Supported date formats are listed [here](https://chmln.github.io/flatpickr/formatting/).

To localize the date picker globally, please follow [these instructions](https://chmln.github.io/flatpickr/localization/).

