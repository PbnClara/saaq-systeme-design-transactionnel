/**
 * OverflowMenu class
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @version 1.3
 * @date 25 juillet 2022
 * @param {void}
 * @return {void}
 */
var OverflowMenu = /** @class */ (function () {
    function OverflowMenu(refBoutonOverflowMenu) {
        this.myParent = null;
        this.myOverlowMenuButton = null;
        this.myULMenu = null;
        this.myOverlowMenuButton = refBoutonOverflowMenu;
        this.myParent = this.myOverlowMenuButton.parentElement;
        this.myULMenu = this.myParent.querySelector(".sdt-overflow-menu__liste");
        this.myOverlowMenuButton.addEventListener("click", this.toggleOverflowMenu.bind(this));
    }
    /**
     * Basculer la classe sur le menu actuellement ouvert. (Toogle the active overflow menu)
     * @param {void}
     * @return {void}
     */
    OverflowMenu.prototype.toggleOverflowMenu = function () {
        // Vérifier si plusieurs menus seraient ouverts
        var otherMenuOpen = document.querySelector(".sdt-overflow-menu__liste--open");
        if (otherMenuOpen &&
            !this.myULMenu.classList.contains("sdt-overflow-menu__liste--open")) {
            document
                .querySelector(".sdt-overflow-menu__liste--open")
                .classList.toggle("sdt-overflow-menu__liste--open");
            this.myULMenu.classList.toggle("sdt-overflow-menu__liste--open");
        }
        else {
            this.myULMenu.classList.toggle("sdt-overflow-menu__liste--open");
        }
        // Bascule du aria-expanded sur le menu
        var etatAriaExpanded = this.myOverlowMenuButton.getAttribute("aria-expanded");
        if (etatAriaExpanded == "true") {
            etatAriaExpanded = "false";
        }
        else if (etatAriaExpanded == "false") {
            etatAriaExpanded = "true";
        }
        this.myOverlowMenuButton.setAttribute("aria-expanded", etatAriaExpanded);
    };
    return OverflowMenu;
}());
// Instancie les menus s'ils existent sur la page
var OverflowMenusModule = (function () {
    if (document.querySelectorAll(".sdt-overflow-menu__bouton")) {
        var overflowMenus = document.querySelectorAll(".sdt-overflow-menu__bouton");
        overflowMenus.forEach(function (element) {
            new OverflowMenu(element);
        });
        document.querySelector("body").classList.add("js");
    }
})();
//# sourceMappingURL=overflow-menu.js.map