const Youdao = require('..');

const fanyi = Youdao({
  appkey: '072f0aceb09ad0a9',
  secret: 'vGPOiCwtLyTnBOi3HMHwRRlQXco7eXSd'
});

(async () => {

  const output = await fanyi('hello world', { to: 'zh-CHS' });
  console.log(output);

})();