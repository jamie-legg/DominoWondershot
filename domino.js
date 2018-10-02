// domino.js

const fetch = require('xfetch').default;
const CookieJar = require('xfetch').CookieJar;

(async () => {
  const jar = new CookieJar();

  await fetch('https://gamecdn.co.uk/dominos/wild-west-wondershot/embed', {
    jar
  });

  const prizes = await fetch('https://gamecdn.co.uk/dominos/wild-west-wondershot/api/achievement/getall', {
    jar,
    responseType: 'json',
    headers: {
      referer: 'https://gamecdn.co.uk/dominos/wild-west-wondershot/embed'
    }
  });

  console.log('prizes', prizes);

  const code = prizes[prizes.length - 2].unique;

  await fetch('https://gamecdn.co.uk/dominos/wild-west-wondershot/reward/process?unique=' + code, {
    jar,
    headers: {
      referer: 'https://gamecdn.co.uk/dominos/wild-west-wondershot/embed'
    }
  });

  const response = await fetch('http://gamecdn.co.uk/dominos/wild-west-wondershot/reward?r=1', {
    jar,
    headers: {
      referer: 'http://gamecdn.co.uk/dominos/wild-west-wondershot/reward'
    }
  });

  const start = '<div id="voucher-code">';

  console.log('Your voucher code is: ' + response.slice(response.indexOf(start) + start.length).match(/[A-Z][^<]+/)[0]);
})();