import attachClickHandler from 'helpers/attachClickHandler';
import { httpGet } from 'helpers/httpGet';

var templateOpenTags = '<div class="item"><p>';
var templateClosingTags = '</p></div>';

var searchBtn = document.querySelector('.searchBtn');

async function task () {
  try {
    await attachClickHandler('.searchBtn');

    const res = await httpGet('/files/text.json');

    const data = JSON.parse(res);
    const favTexts = data.users.map(function (user) {
       const r = httpGet('/files/' + user.FavTextId + '.json');
       return r;
    });

    let html = '';
    for (let chapter of favTexts) {
      html += templateOpenTags + (await chapter) + templateClosingTags;
    }

    var wrapper = document.querySelector('.postwrapper');
    wrapper.innerHTML = html;

  } catch (err) {
    logError(err);
  }
}

task();

function logError(error) {
  console.error(error);
}