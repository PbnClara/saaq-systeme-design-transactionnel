import settings from '../../ressources/js/settings';
import mixin from '../../ressources/js/misc/mixin';
import createComponent from '../../ressources/js/mixins/create-component';
import initComponentBySearch from '../../ressources/js/mixins/init-component-by-search';
import handles from '../../ressources/js/mixins/handles';
import on from '../../ressources/js/misc/on';

class NumberInput extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Number input UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a number input UI.
   */
  constructor(element, options) {
    super(element, options);
    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
    // <svg> does not have `Element.classList` in IE11
    this.manage(
      on(this.element.querySelector('.up-icon'), 'click', event => {
        this._handleClick(event);
      })
    );
    this.manage(
      on(this.element.querySelector('.down-icon'), 'click', event => {
        this._handleClick(event);
      })
    );
  }

  /**
   * Increase/decrease number by clicking on up/down icons.
   * @param {Event} event The event triggering this method.
   */
  _handleClick(event) {
    const numberInput = this.element.querySelector(this.options.selectorInput);
    const target = event.currentTarget.getAttribute('class').split(' ');

    if (target.indexOf('up-icon') >= 0) {
      ++numberInput.value;
    } else if (target.indexOf('down-icon') >= 0) {
      --numberInput.value;
    }

    // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
    numberInput.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        cancelable: false,
      })
    );
  }

  /**
   * The map associating DOM element and number input UI instance.
   * @member NumberInput.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
   * @member NumberInput.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find number input UIs.
   * @property {string} [selectorInput] The CSS selector to find the `<input>` element.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-numberinput]',
      selectorInput: `.${prefix}--number input`,
    };
  }
}

export default NumberInput;
