import co from 'co';
import attachClickHandler from 'helpers/attachClickHandler';
import { httpGet } from 'helpers/httpGet';

var templateOpenTags = '<div class="item"><p>';
var templateClosingTags = '</p></div>';

var searchBtn = document.querySelector('.searchBtn');

co(function* task() {
  yield attachClickHandler('.searchBtn');
  const res = yield httpGet('/files/text.json');

  const data = JSON.parse(res);
  const favTexts = yield data.users.map((user) => {
    return httpGet('/files/' + user.FavTextId + '.json');
  });

  var html = favTexts.reduce((acc, curr) => {
    return acc += templateOpenTags + curr + templateClosingTags;
  }, '');

  var wrapper = document.querySelector('.postwrapper');
  wrapper.innerHTML = html;
}).catch(logError);

function logError(error) {
  console.error(error);
}