export function httpGet(url) {
  var xhr = new XMLHttpRequest();
  var promise = new Promise(function(resolve, reject) {
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });

  return promise;
}