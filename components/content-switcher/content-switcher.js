/**
 * ContentSwitcher class
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @version 1.0
 * @param {Li element}
 * @return {void}
 */
var ContentSwitcher = /** @class */ (function () {
    function ContentSwitcher(refLiElement) {
        this.myUlParent = null;
        this.myLiElement = null;
        this.myLiElement = refLiElement;
        this.myUlParent = refLiElement.parentElement;
        this.myLiElement.addEventListener("click", this.toggleActiveTab.bind(this));
    }
    /**
     * Toogle the active tab
     * @param {void}
     * @return {void}
     */
    ContentSwitcher.prototype.toggleActiveTab = function () {
        // Vérifier si l'onglet est déjà actif
        var tabIsActive = this.myLiElement.classList.contains("sdt-content-switcher-v2__nav-item--selected");
        // Si l'onglet n'est pas actif, mettre l'autre onglet inactif avant
        if (!tabIsActive) {
            this.myUlParent
                .querySelector(".sdt-content-switcher-v2__nav-item--selected")
                .classList.toggle("sdt-content-switcher-v2__nav-item--selected");
            // Activer ensuite l'onglet courant.
            this.myLiElement.classList.toggle("sdt-content-switcher-v2__nav-item--selected");
        }
    };
    return ContentSwitcher;
}());
// Init Content Switchers if exist on the page.
var ContentSwitchersModule = (function () {
    if (document.querySelectorAll(".sdt-content-switcher-v2__nav-item")) {
        var contentSwitchers = document.querySelectorAll(".sdt-content-switcher-v2__nav-item");
        contentSwitchers.forEach(function (element) {
            new ContentSwitcher(element);
        });
    }
})();
//# sourceMappingURL=content-switcher.js.map