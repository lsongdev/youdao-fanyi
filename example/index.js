const Youdao = require('..');

const fanyi = Youdao({
  key: '2001075261',
  keyfrom: 'LSONGORG'
});

(async () => {

  const output = await fanyi('hello world');
  console.log(output);

})();