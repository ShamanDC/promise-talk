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
    const favTexts = data.users.map(async function (user) {
       const r = await httpGet('/files/' + user.FavTextId + '.json');
       return r;
    });

    var html = favTexts.reduce((acc, curr) => {
      return acc += templateOpenTags + curr + templateClosingTags;
    }, '');

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