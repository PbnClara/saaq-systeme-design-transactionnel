/**
 * ContentSwitcher class
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @version 1.0
 * @param {Li element}
 * @return {void}
 */

class ContentSwitcher {
  myUlParent: HTMLUListElement = null as HTMLUListElement;
  myLiElement: HTMLLIElement = null as HTMLLIElement;

  constructor(refLiElement) {
    this.myLiElement = refLiElement;
    this.myUlParent = refLiElement.parentElement;
    this.myLiElement.addEventListener("click", this.toggleActiveTab.bind(this));
  }

  /**
   * Toogle the active tab
   * @param {void}
   * @return {void}
   */
  toggleActiveTab() {
    // Vérifier si l'onglet est déjà actif
    const tabIsActive = this.myLiElement.classList.contains(
      "sdt-content-switcher-v2__nav-item--selected"
    );

    // Si l'onglet n'est pas actif, mettre l'autre onglet inactif avant
    if (!tabIsActive) {
      this.myUlParent
        .querySelector(".sdt-content-switcher-v2__nav-item--selected")
        .classList.toggle("sdt-content-switcher-v2__nav-item--selected");

      // Activer ensuite l'onglet courant.
      this.myLiElement.classList.toggle(
        "sdt-content-switcher-v2__nav-item--selected"
      );
    }
  }
}

// Init Content Switchers if exist on the page.

const ContentSwitchersModule = (() => {
  if (document.querySelectorAll(".sdt-content-switcher-v2__nav-item")) {
    const contentSwitchers = document.querySelectorAll(
      ".sdt-content-switcher-v2__nav-item"
    );
    contentSwitchers.forEach((element) => {
      new ContentSwitcher(element);
    });
  }
})();
