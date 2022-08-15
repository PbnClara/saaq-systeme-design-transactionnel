import settings from '../../ressources/js/settings';
import mixin from '../../ressources/js/misc/mixin';
import createComponent from '../../ressources/js/mixins/create-component';
import initComponentBySearch from '../../ressources/js/mixins/init-component-by-search';
import handles from '../../ressources/js/mixins/handles';
import eventMatches from '../../ressources/js/misc/event-matches';
import on from '../../ressources/js/misc/on';

class TextInput extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * TextInput
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The root element of text inputs
   * @param {Object} [options] the... options
   */
  constructor(element, options) {
    super(element, options);
    const lang = this.element.getAttribute(this.options.attribLang);
    const type = this.element.getAttribute(this.options.attribType);
    
    if (type === 'phone-number') {
      this.manage(
        on(this.element, 'keyup', evt => {
          this._formatPhoneNumber(evt, lang);
        }),
        on(this.element, 'blur', evt => {
          this._formatPhoneNumber(evt, lang);
        })
      );
    }

    else if (type === 'folder-number') {
      this.manage(
        on(this.element, 'keyup', evt => {
          this._formatFolderNumber(evt, lang);
        }),
        on(this.element, 'blur', evt => {
          this._formatFolderNumber(evt, lang);
        })
      );
    }
    else if (type === 'currency' || type === 'number') {
      this.manage(
        on(this.element, 'keyup', evt => {
          this._formatNumber(evt, lang);
        }),
        on(this.element, 'blur', evt => {
          this._formatNumber(evt, lang);
        })
      );
    }
    else if (type === 'integer') {
      this.manage(
        on(this.element, 'keyup', evt => {
          this._formatInteger(evt, lang);
        }),
        on(this.element, 'blur', evt => {
          this._formatInteger(evt, lang);
        })
      );
    }
  }

  _formatPhoneNumber(event, lang) {
    const target = event.target;
    target.maxLength = "12";
    const input = target.value.replace(/\D/g, '');
    const region = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const end = input.substring(6, 10);
    const regionSeparator = lang === 'en' ? '-' : ' ';

    if (input.length > 6) { 
      target.value = `${region}${regionSeparator}${middle}-${end}`; 
    }
    else if (input.length > 3) {
      target.value = `${region}${regionSeparator}${middle}`; 
    }
    else if (input.length > 0) { 
      target.value = `${region}`; 
    }
    else {
      target.value = ``;
    }
  }

  _formatInteger(event, lang) {
    const target = event.target;
    target.maxLength = "15";
    const input = target.value.replace(/\D/g, '');
    const billions = input.slice(-12, -9);
    const millions = input.slice(-9, -6);
    const thousands = input.slice(-6, -3);
    const hundreds = input.slice(-3);
    const thousandsLessThanFour = input.slice(-4);
    console.log(thousandsLessThanFour);
    const thousandsSeparator = lang === 'en' ? ',' : ' ';

    if (input.length > 9) {
      target.value = `${billions}${thousandsSeparator}${millions}${thousandsSeparator}${thousands}${thousandsSeparator}${hundreds}`;
    }
    else if (input.length > 6) {
      target.value = `${millions}${thousandsSeparator}${thousands}${thousandsSeparator}${hundreds}`;
    }
    else if (input.length > 4) {
      target.value = `${thousands}${thousandsSeparator}${hundreds}`;
    }
    else if (input.length > 0) {
      target.value = `${thousandsLessThanFour}`;
    }
    else {
      target.value = ``;
    }
  }

  _formatNumber(event, lang) {
    const target = event.target;
    target.maxLength = "18";
    const input = target.value.replace(/\D/g, '');
    const billions = input.slice(-14, -11);
    const millions = input.slice(-11, -8);
    const thousands = input.slice(-8, -5);
    const hundreds = input.slice(-5, -2);
    const thousandsLessThanFour = input.slice(-6, -2);
    const cents = input.slice(-2);
    const centsSeparator = lang === 'en' ? '.' : ',';
    const thousandsSeparator = lang === 'en' ? ',' : ' ';

    if (input.length > 11) {
      target.value = `${billions}${thousandsSeparator}${millions}${thousandsSeparator}${thousands}${thousandsSeparator}${hundreds}${centsSeparator}${cents}`;
    }
    else if (input.length > 8) {
      target.value = `${millions}${thousandsSeparator}${thousands}${thousandsSeparator}${hundreds}${centsSeparator}${cents}`;
    }
    else if (input.length > 6) {
      target.value = `${thousands}${thousandsSeparator}${hundreds}${centsSeparator}${cents}`;
    }
    else if (input.length > 2) {
      target.value = `${thousandsLessThanFour}${centsSeparator}${cents}`;
    }
    else if (input.length > 0) {
      target.value = `${cents}`;
    }
    else {
      target.value = ``;
    }
  }

  _formatFolderNumber(event, lang) {
    const target = event.target;
    target.maxLength = "15";
    let input = target.value.replace(/\W/g, '');
    console.log(input);
    const start = input.substring(0, 5);
    const middle = input.substring(5, 11);
    const end = input.substring(11, 13);

    if (input.length > 11) { 
      target.value = `${start}-${middle}-${end}`; 
    }
    else if (input.length > 5) {
      target.value = `${start}-${middle}`; 
    }
    else if (input.length > 0) { 
      target.value = `${start}`; 
    }
    else {
      target.value = ``;
    }
  }

  static components = new WeakMap(); 

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-text-input]',
      attribLang: 'data-text-input-lang',
      attribType: 'data-text-input-type',
    };
  }
}

export default TextInput;
