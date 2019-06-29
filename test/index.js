const Youdao = require('..');
const assert = require('assert');

const text = 'hello world';

// Youdao's options as a string
Youdao(text, (err, res) => {
  assert.equal(err, null);
  assert.equal(res.translation[0], '你好，世界');
});

// Youdao's options as an object
const fanyi = Youdao({
  key: '2001075261',
  keyfrom: 'LSONGORG'
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
  const res = await Youdao.fanyi(text);
  assert.equal(res.translation[0], '你好，世界');
})();

fanyi(text, { only: 'dict' }, (err, res) => {
  assert.ok(res.web);
  assert.ok(res.basic);
  assert.equal(res.translation, undefined);
});