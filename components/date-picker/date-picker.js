import Flatpickr from 'flatpickr';
import settings from '../../ressources/js/settings';
import mixin from '../../ressources/js/misc/mixin';
import createComponent from '../../ressources/js/mixins/create-component';
import initComponentBySearch from '../../ressources/js/mixins/init-component-by-search';
import handles from '../../ressources/js/mixins/handles';
import on from '../../ressources/js/misc/on';

/* eslint no-underscore-dangle: [2, { "allow": ["_input", "_updateClassNames", "_updateInputFields"], "allowAfterThis": true }] */

// `this.options` create-component mix-in creates prototype chain
// so that `options` given in constructor argument wins over the one defined in static `options` property
// 'Flatpickr' wants flat structure of object instead

function flattenOptions(options) {
  const o = {};
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in options) {
    o[key] = options[key];
  }
  return o;
}

/**
 * Augments Flatpickr instance so that event objects Flatpickr fires is marked as non-user-triggered events.
 * @param {Flatpickr} calendar The Flatpickr instance.
 * @returns {Flatpickr} The augmented Flatpickr instance.
 * @private
 */
function augmentFlatpickr(calendar) {
  const container = calendar._;
  if (container) {
    if (container.changeEvent) {
      container._changeEvent = container.changeEvent; // eslint-disable-line no-underscore-dangle
    }
    Object.defineProperty(container, 'changeEvent', {
      get() {
        return this._changeEvent;
      },
      set(value) {
        value.detail = Object.assign(value.detail || {}, { fromFlatpickr: true });
        this._changeEvent = value;
      },
    });
  }
  return calendar;
}

// Weekdays shorthand for english locale
Flatpickr.l10ns.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = Flatpickr.l10ns.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

class DatePicker extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * DatePicker.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an date picker.
   */
  constructor(element, options) {
    super(element, options);
    const type = this.element.getAttribute(this.options.attribType);
    this.calendar = this._initDatePicker(type);
    this.manage(
      on(this.element, 'keydown', e => {
        if (e.which === 40) {
          this.calendar.calendarContainer.focus();
        }
      })
    );
    this.manage(
      on(this.calendar.calendarContainer, 'keydown', e => {
        if (e.which === 9 && type === 'range') {
          this._updateClassNames(this.calendar);
          this.element.querySelector(this.options.selectorDatePickerInputFrom).focus();
        }
      })
    );
  }

  /**
   * Opens the date picker dropdown when this component gets focus.
   * Used only for range mode for now.
   * @private
   */
  _handleFocus = () => {
    if (this.calendar) {
      this.calendar.open();
    }
  };

  /**
   * Closes the date picker dropdown when this component loses focus.
   * Used only for range mode for now.
   * @private
   */
  _handleBlur = event => {
    if (this.calendar) {
      const focusTo = event.relatedTarget;
      if (!focusTo || (!this.element.contains(focusTo) && !this.calendar.calendarContainer.contains(focusTo))) {
        this.calendar.close();
      }
    }
  };

  _initDatePicker = type => {
    if (type === 'range') {
      // Given FlatPickr assumes one `<input>` even in range mode,
      // use a hidden `<input>` for such purpose, separate from our from/to `<input>`s
      const doc = this.element.ownerDocument;
      const rangeInput = doc.createElement('input');
      rangeInput.className = this.options.classVisuallyHidden;
      doc.body.appendChild(rangeInput);
      this._rangeInput = rangeInput;

      // An attempt to open the date picker dropdown when this component gets focus,
      // and close the date picker dropdown when this component loses focus
      const w = doc.defaultView;
      const hasFocusin = 'onfocusin' in w;
      const hasFocusout = 'onfocusout' in w;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      const focusoutEventName = hasFocusout ? 'focusout' : 'blur';
      this.manage(on(this.element, focusinEventName, this._handleFocus, !hasFocusin));
      this.manage(on(this.element, focusoutEventName, this._handleBlur, !hasFocusout));

      // An attempt to disable Flatpickr's focus tracking system,
      // which has adverse effect with our old set up with two `<input>`s or our latest setup with a hidden `<input>`
      this.manage(
        on(doc, 'mousedown', () => {
          if (this.calendar.isOpen) {
            this.calendar.config.inline = true;
            setTimeout(() => {
              this.calendar.config.inline = false;
            }, 0);
          }
        })
      );
    }
    const self = this;
    const date = type === 'range' ? this._rangeInput : this.element.querySelector(this.options.selectorDatePickerInput);
    const { onClose, onChange, onMonthChange, onYearChange, onOpen, onValueUpdate } = this.options;
    const calendar = new Flatpickr(
      date,
      Object.assign(flattenOptions(this.options), {
        allowInput: true,
        mode: type,
        positionElement: type === 'range' && this.element.querySelector(this.options.selectorDatePickerInputFrom),
        onClose(selectedDates, ...remainder) {
          if (!onClose || onClose.call(this, selectedDates, ...remainder) !== false) {
            self._updateClassNames(calendar);
            self._updateInputFields(selectedDates, type);
          }
        },
        onChange(...args) {
          if (!onChange || onChange.call(this, ...args) !== false) {
            self._updateClassNames(calendar);
            if (type === 'range') {
              if (calendar.selectedDates.length === 1 && calendar.isOpen) {
                self.element.querySelector(self.options.selectorDatePickerInputTo).classList.add(self.options.classFocused);
              } else {
                self.element.querySelector(self.options.selectorDatePickerInputTo).classList.remove(self.options.classFocused);
              }
            }
          }
        },
        onMonthChange(...args) {
          if (!onMonthChange || onMonthChange.call(this, ...args) !== false) {
            self._updateClassNames(calendar);
          }
        },
        onYearChange(...args) {
          if (!onYearChange || onYearChange.call(this, ...args) !== false) {
            self._updateClassNames(calendar);
          }
        },
        onOpen(...args) {
          if (!onOpen || onOpen.call(this, ...args) !== false) {
            self._updateClassNames(calendar);
          }
        },
        onValueUpdate(...args) {
          if ((!onValueUpdate || onValueUpdate.call(this, ...args) !== false) && type === 'range') {
            self._updateInputFields(self.calendar.selectedDates, type);
          }
        },
        nextArrow: this._rightArrowHTML(),
        prevArrow: this._leftArrowHTML(),
      })
    );
    if (type === 'range') {
      this._addInputLogic(this.element.querySelector(this.options.selectorDatePickerInputFrom), 0);
      this._addInputLogic(this.element.querySelector(this.options.selectorDatePickerInputTo), 1);
    }
    this.manage(
      on(this.element.querySelector(this.options.selectorDatePickerIcon), 'click', () => {
        calendar.open();
      })
    );
    this._updateClassNames(calendar);
    if (type !== 'range') {
      this._addInputLogic(date);
    }
    return augmentFlatpickr(calendar);
  };

  _rightArrowHTML() {
    return `
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>
      </svg>`;
  }

  _leftArrowHTML() {
    return `
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"></path>
      </svg>`;
  }

  _addInputLogic = (input, index) => {
    if (!isNaN(index) && (index < 0 || index > 1)) {
      throw new RangeError(`The index of <input> (${index}) is out of range.`);
    }
    const inputField = input;
    this.manage(
      on(inputField, 'change', evt => {
        if (!evt.detail || !evt.detail.fromFlatpickr) {
          const inputDate = this.calendar.parseDate(inputField.value);
          if (inputDate && !isNaN(inputDate.valueOf())) {
            if (isNaN(index)) {
              this.calendar.setDate(inputDate);
            } else {
              const selectedDates = this.calendar.selectedDates;
              selectedDates[index] = inputDate;
              this.calendar.setDate(selectedDates);
            }
          }
        }
        this._updateClassNames(this.calendar);
      })
    );
    // An attempt to temporarily set the `<input>` being edited as the one FlatPicker manages,
    // as FlatPicker attempts to take over `keydown` event handler on `document` to run on the date picker dropdown.
    this.manage(
      on(inputField, 'keydown', evt => {
        const origInput = this.calendar._input;
        this.calendar._input = evt.target;
        setTimeout(() => {
          this.calendar._input = origInput;
        });
      })
    );
  };

  _updateClassNames = calendar => {
    const calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add(this.options.classCalendarContainer);
    calendarContainer.querySelector('.flatpickr-month').classList.add(this.options.classMonth);
    calendarContainer.querySelector('.flatpickr-weekdays').classList.add(this.options.classWeekdays);
    calendarContainer.querySelector('.flatpickr-days').classList.add(this.options.classDays);
    [...calendarContainer.querySelectorAll('.flatpickr-weekday')].forEach(item => {
      const currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add(this.options.classWeekday);
    });
    [...calendarContainer.querySelectorAll('.flatpickr-day')].forEach(item => {
      item.classList.add(this.options.classDay);
    });
  };

  _updateInputFields = (selectedDates, type) => {
    if (this.calendar._input.value !== "") {
      if (type === 'range') {
        if (selectedDates.length === 2) {
          this.element.querySelector(this.options.selectorDatePickerInputFrom).value = this._formatDate(selectedDates[0]);
          this.element.querySelector(this.options.selectorDatePickerInputTo).value = this._formatDate(selectedDates[1]);
        } else if (selectedDates.length === 1) {
          this.element.querySelector(this.options.selectorDatePickerInputFrom).value = this._formatDate(selectedDates[0]);
        }
      } else if (selectedDates.length === 1) {
        this.element.querySelector(this.options.selectorDatePickerInput).value = this._formatDate(selectedDates[0]);
      }
    }
    else {
      this.calendar.clear();
    }
    this._updateClassNames(this.calendar);
  };

  _formatDate = date =>
    this.calendar.formatDate(
      date,
      this.element.getAttribute('date-format') === null
        ? this.calendar.config.dateFormat
        : this.element.getAttribute('date-format')
    );

  release() {
    if (this.calendar) {
      try {
        this.calendar.destroy();
      } catch (err) {} // eslint-disable-line no-empty
      this.calendar = null;
    }
    return super.release();
  }

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode DatePicker.create .create()}, or {@linkcode DatePicker.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode DatePicker.init .init()} works.
   * @property {string} selectorInit The CSS selector to find date picker UIs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-date-picker]',
      selectorDatePickerInput: '[data-date-picker-input]',
      selectorDatePickerInputFrom: '[data-date-picker-input-from]',
      selectorDatePickerInputTo: '[data-date-picker-input-to]',
      selectorDatePickerIcon: '[data-date-picker-icon]',
      classCalendarContainer: `${prefix}--date-picker__calendar`,
      classMonth: `${prefix}--date-picker__month`,
      classWeekdays: `${prefix}--date-picker__weekdays`,
      classDays: `${prefix}--date-picker__days`,
      classWeekday: `${prefix}--date-picker__weekday`,
      classDay: `${prefix}--date-picker__day`,
      classFocused: `${prefix}--focused`,
      classVisuallyHidden: 'sdt-visually-hidden',
      attribType: 'data-date-picker-type',
      dateFormat: 'Y/m/d',
    };
  }

  /**
   * The map associating DOM element and date picker UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default DatePicker;
