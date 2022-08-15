/**
 * OverflowMenu class
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @version 1.3
 * @date 25 juillet 2022
 * @param {void}
 * @return {void}
 */

class OverflowMenu {
  myParent: HTMLElement = null as HTMLElement;
  myOverlowMenuButton: HTMLButtonElement = null as HTMLButtonElement;
  myULMenu: HTMLUListElement = null as HTMLUListElement;

  constructor(refBoutonOverflowMenu) {
    this.myOverlowMenuButton = refBoutonOverflowMenu;
    this.myParent = this.myOverlowMenuButton.parentElement;
    this.myULMenu = this.myParent.querySelector(".sdt-overflow-menu__liste");

    this.myOverlowMenuButton.addEventListener(
      "click",
      this.toggleOverflowMenu.bind(this)
    );
  }

  /**
   * Basculer la classe sur le menu actuellement ouvert. (Toogle the active overflow menu)
   * @param {void}
   * @return {void}
   */
  toggleOverflowMenu() {
    // Vérifier si plusieurs menus seraient ouverts
    const otherMenuOpen = document.querySelector(
      ".sdt-overflow-menu__liste--open"
    );

    if (
      otherMenuOpen &&
      !this.myULMenu.classList.contains("sdt-overflow-menu__liste--open")
    ) {
      document
        .querySelector(".sdt-overflow-menu__liste--open")
        .classList.toggle("sdt-overflow-menu__liste--open");
      this.myULMenu.classList.toggle("sdt-overflow-menu__liste--open");
    } else {
      this.myULMenu.classList.toggle("sdt-overflow-menu__liste--open");
    }

    // Bascule du aria-expanded sur le menu
    let etatAriaExpanded =
      this.myOverlowMenuButton.getAttribute("aria-expanded");
    if (etatAriaExpanded == "true") {
      etatAriaExpanded = "false";
    } else if (etatAriaExpanded == "false") {
      etatAriaExpanded = "true";
    }
    this.myOverlowMenuButton.setAttribute("aria-expanded", etatAriaExpanded);
  }
}

// Instancie les menus s'ils existent sur la page

const OverflowMenusModule = (() => {
  if (document.querySelectorAll(".sdt-overflow-menu__bouton")) {
    const overflowMenus = document.querySelectorAll(
      ".sdt-overflow-menu__bouton"
    );
    overflowMenus.forEach((element) => {
      new OverflowMenu(element);
    });
    document.querySelector("body").classList.add("js");
  }
})();
