/**
 * Color
 * @author Clara Plébani <clara.plebani@saaq.gouv.qc.ca>
 * @licence Société de l'assurance automobile du Québec
 * @param {HTMLElement} domNode - The list element root
 * @return {void} Nothing
 */
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
