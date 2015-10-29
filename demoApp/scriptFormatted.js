(function () {
  var scrollToLoad = 50;
  var templateOpenTags = '<div class="item"><p>';
  var templateClosingTags = '</p></div>';

  var searchBtn = document.querySelector('.searchBtn');

  attachClickHandler('.searchBtn')
    .then(function() {
      httpGet('/text.json')
        .then(function(response) {
            var data = JSON.parse(response);

            var allCalls = data.users.map(function(user) {
              return httpGet('/' + user.FavTextId + '.json');
            });

            return Promise.all(allCalls);
        }).then(function(favTexts) {

          var html = favTexts.reduce(function(acc, curr) {
            return acc += templateOpenTags + curr + templateClosingTags;
          }, '');

          var wrapper = document.querySelector('.postwrapper');
          wrapper.innerHTML = html;
        }).catch(logError);
  });

  function attachClickHandler(selector) {
    return new Promise(function(res) {
      var elem = document.querySelector(selector);
      elem.addEventListener('click', res);
    });
  }

  function logError(error) {
    console.error(error);
  }

  function httpGet(url) {
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
})();