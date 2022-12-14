import settings from '../../ressources/js/settings';
import mixin from '../../ressources/js/misc/mixin';
import createComponent from '../../ressources/js/mixins/create-component';
import initComponentBySearch from '../../ressources/js/mixins/init-component-by-search';
import eventedState from '../../ressources/js/mixins/evented-state';
import handles from '../../ressources/js/mixins/handles';
import eventMatches from '../../ressources/js/misc/event-matches';
import on from '../../ressources/js/misc/on';

class FileUploader extends mixin(createComponent, initComponentBySearch, eventedState, handles) {
  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends eventedState
   * @extends Handles
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options. See static options.
   */
  constructor(element, options = {}) {
    super(element, options);
    this.input = this.element.querySelector(this.options.selectorInput);
    this.container = this.element.querySelector(this.options.selectorContainer);

    if (!this.input) {
      throw new TypeError('Cannot find the file input box.');
    }

    if (!this.container) {
      throw new TypeError('Cannot find the file names container.');
    }

    this.inputId = this.input.getAttribute('id');
    this.manage(on(this.input, 'change', () => this._displayFilenames()));
    this.manage(on(this.container, 'click', this._handleDeleteButton));
  }

  _filenamesHTML(name, id) {
    return `<span class="${this.options.classSelectedFile}">
      <p class="${this.options.classFileName}">${name}</p>
      <span data-for="${id}" class="${this.options.classStateContainer}"></span>
    </span>`;
  }

  _uploadHTML() {
    return `
      <div data-loading class="${this.options.classLoading}">
        <svg class="${this.options.classLoadingSvg}" viewBox="-42 -42 84 84">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>`;
  }

  _closeButtonHTML() {
    return `
      <svg class="${this.options.classFileClose}" tabindex="0" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8
          9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
      </svg>`;
  }

  _checkmarkHTML() {
    return `
      <svg class="${this.options.classFileComplete}" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">
       <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"/>
      </svg>`;
  }

  _changeState = (state, detail, callback) => {
    if (state === 'delete-filename-fileuploader') {
      this.container.removeChild(detail.filenameElement);
    }
    if (typeof callback === 'function') {
      callback();
    }
  };

  _getStateContainers() {
    const stateContainers = [...this.element.querySelectorAll(`[data-for=${this.inputId}]`)];

    if (stateContainers.length === 0) {
      throw new TypeError('State container elements not found; invoke _displayFilenames() first');
    }

    if (stateContainers[0].dataset.for !== this.inputId) {
      throw new TypeError('File input id must equal [data-for] attribute');
    }

    return stateContainers;
  }

  /**
   * Inject selected files into DOM. Invoked on change event.
   */
  _displayFilenames() {
    const container = this.element.querySelector(this.options.selectorContainer);
    const HTMLString = [...this.input.files].map(file => this._filenamesHTML(file.name, this.inputId)).join('');

    container.insertAdjacentHTML('afterbegin', HTMLString);
  }

  _removeState(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  _handleStateChange(elements, selectIndex, html) {
    if (selectIndex === undefined) {
      elements.forEach(el => {
        this._removeState(el);
        el.insertAdjacentHTML('beforeend', html);
      });
    } else {
      elements.forEach((el, index) => {
        if (index === selectIndex) {
          this._removeState(el);
          el.insertAdjacentHTML('beforeend', html);
        }
      });
    }
  }

  /**
   * Handles delete button.
   * @param {Event} evt The event triggering this action.
   * @private
   */
  _handleDeleteButton = evt => {
    const target = eventMatches(evt, `[data-for=${this.inputId}]`);
    if (target) {
      this._changeState('delete-filename-fileuploader', {
        initialEvt: evt,
        filenameElement: target.parentNode,
      });
    }
  };

  setState(state, selectIndex) {
    const stateContainers = this._getStateContainers();

    if (state === 'edit') {
      this._handleStateChange(stateContainers, selectIndex, this._closeButtonHTML());
    }

    if (state === 'upload') {
      this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
    }

    if (state === 'complete') {
      this._handleStateChange(stateContainers, selectIndex, this._checkmarkHTML());
    }
  }

  /**
   * The map associating DOM element and file uploader instance.
   * @member FileUploader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-file]',
      selectorInput: `input[type="file"].${prefix}--file-input`,
      selectorContainer: '[data-file-container]',
      selectorCloseButton: `.${prefix}--file-close`,
      classLoading: `${prefix}--loading`,
      classLoadingSvg: `${prefix}--loading__svg`,
      classFileName: `${prefix}--file-filename`,
      classFileClose: `${prefix}--file-close`,
      classFileComplete: `${prefix}--file-complete`,
      classSelectedFile: `${prefix}--file__selected-file`,
      classStateContainer: `${prefix}--file__state-container`,
      eventBeforeDeleteFilenameFileuploader: 'fileuploader-before-delete-filename',
      eventAfterDeleteFilenameFileuploader: 'fileuploader-after-delete-filename',
    };
  }
}

export default FileUploader;
