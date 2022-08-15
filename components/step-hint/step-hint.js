import settings from '../../ressources/js/settings';
import mixin from '../../ressources/js/misc/mixin';
import createComponent from '../../ressources/js/mixins/create-component';
import initComponentBySearch from '../../ressources/js/mixins/init-component-by-search';
import handles from '../../ressources/js/mixins/handles';
import eventMatches from '../../ressources/js/misc/event-matches';
import on from '../../ressources/js/misc/on';

class StepHint extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * StepHint.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a step-hint.
   */

  constructor(element, options) {
    super(element, options);

    const autoCollapseCallback = function() {
      this._toggle(this.element);
    }.bind(this);

    this.manage(
      on(this.element, 'click', event => {
        const item = eventMatches(event, this.options.selectorStepHintButton);

        if (item) this._toggle(this.element);
      })
    );

    this._timerAutoCollapse = setTimeout(autoCollapseCallback, this.options.timingAutoClose);
  }

  _toggle(element) {
    const expanded = element.getAttribute('aria-expanded');

    clearTimeout(this._timerAutoCollapse);

    if (expanded !== null) element.setAttribute('aria-expanded', expanded === 'true' ? 'false' : 'true');
  }

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode StepHint.create .create()}, or {@linkcode StepHint.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode StepHint.init .init()} works.
   * @member StepHint.options
   * @type {Object}
   * @property {string} [selectorInit] The CSS selector to find step hint container.
   * @property {string} [selectorStepHintButton] The CSS selector to find step hint button.
   * @property {int} [timingAutoClose] The auto-close timing.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-step-hint]',
      selectorStepHintButton: `.${prefix}--step-hint__button`,
      timingAutoClose: 7000
    };
  }

  /**
   * The map associating DOM element and step-hint UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default StepHint;
