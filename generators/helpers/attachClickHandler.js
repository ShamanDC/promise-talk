export default function attachClickHandler(selector) {
  return new Promise(function(res) {
    var elem = document.querySelector(selector);
    elem.addEventListener('click', res);
  });
}