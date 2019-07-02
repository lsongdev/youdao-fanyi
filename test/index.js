const Youdao = require('..');
const assert = require('assert');

const text = 'hello world';

const fanyi = Youdao({
  appkey: '072f0aceb09ad0a9',
  secret: 'vGPOiCwtLyTnBOi3HMHwRRlQXco7eXSd'
});

// callback style
fanyi(text, (err, res) => {
  assert.equal(err, null);
  assert.equal(res.translation[0], '你好，世界');
});

// Promise style
fanyi(text).then(res => {
  assert.equal(res.translation[0], '你好，世界');
});

// async/await style works well
(async () => {
  const res = await fanyi(text);
  assert.equal(res.translation[0], '你好，世界');
})();
