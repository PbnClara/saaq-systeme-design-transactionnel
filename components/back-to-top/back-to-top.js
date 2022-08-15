/**
 * Back to top button class
 * @author Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @param {void}
 * @return {void}
 */
var BackToTop = /** @class */ (function () {
    function BackToTop() {
        this.refHTMLButton = document.querySelector(".sdt-btn--backtotop");
        this.refHTMLButton.addEventListener("click", this.goToTop.bind(this));
    }
    /**
     * Show the button if the user scroll the page
     * @param {void}
     * @return {void}
     */
    BackToTop.prototype.onScroll = function () {
        if (document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50) {
            this.refHTMLButton.style.display = "block";
        }
        else {
            this.refHTMLButton.style.display = "none";
        }
    };
    /**
     * Go at the top of the page
     * @param {void}
     * @return {void}
     */
    BackToTop.prototype.goToTop = function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox and Opera
    };
    return BackToTop;
}());
// Init button on the page only if a back top top button exist.
var backToTopButtonModule = (function () {
    if (document.querySelector(".sdt-btn--backtotop")) {
        var backToTop_1 = new BackToTop();
        // When the user scrolls down 50px from the top of the document, show the button
        window.onscroll = function () {
            backToTop_1.onScroll();
        };
    }
})();
//# sourceMappingURL=back-to-top.js.map