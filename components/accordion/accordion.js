/**
 * Accordion
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @param {HTMLElement} domNode - The list element root
 * @return {void} Nothing
 */

'use strict';

class Accordion {
  constructor(domNode) {
    this.rootEl = domNode;
    this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');

    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

    // add event listeners
    this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    this.toggle(!this.open);
  }

  toggle(open) {

    // don't do anything if the open state doesn't change
    if (open === this.open) {
      return;
    }

    // update the internal state
    this.open = open;

    // handle DOM updates
    this.buttonEl.setAttribute('aria-expanded', `${open}`);
    this.rootEl.classList.toggle("sdt-accordion--active");
  }

  // Add public open and close methods for convenience
  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}

// init accordions

/* hide all panels if JS is active */
const accordionsSections = document.querySelectorAll('.sdt-accordion.sdt-accordion--active');
accordionsSections.forEach((accordionEl) => {
  accordionEl.classList.toggle('sdt-accordion--active');
});

const accordionsH3 = document.querySelectorAll('.sdt-accordion');
accordionsH3.forEach((accordionEl) => {
  new Accordion(accordionEl);
});
