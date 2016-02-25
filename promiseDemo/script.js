(function () {
  var templateOpenTags = '<div class="item"><p>';
  var templateClosingTags = '</p></div>';

  var searchBtn = document.querySelector('.searchBtn');

  searchBtn.addEventListener('click', function() {
    httpGet('/text.json',
      function(response) {
        var data = JSON.parse(response);

        var html = '';
        var usersCount = data.users.length;
        var alreadyLoadedUsers = 0;

        data.users.forEach(function(user) {
          httpGet('/' + user.FavTextId + '.json',
            function(favText) {

              html += templateOpenTags + favText + templateClosingTags;

              alreadyLoadedUsers++;
              if (usersCount === alreadyLoadedUsers) {
                var wrapper = document.querySelector('.postwrapper');
                wrapper.innerHTML = html;
              }
            },
            function(errorGettingText) {
              console.error(errorGettingText);
            }
          );

        });
      },
      function(error) {
        console.error(error);
      }
    );
  });

  function httpGet(url, done, fail) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        done(xhr.response);
      } else {
        fail(xhr.statusText);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
})();