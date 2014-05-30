const http = require('http');
const { URL } = require('url');
const assert = require('assert');

const get = o =>
  new Promise(done => http.get(o, done));

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

const parseURL = (url, query) => {
  const o = new URL(url);
  Object.keys(query).forEach(k =>
    o.searchParams.append(k, query[k]));
  return o;
}
const ERROR_CODES = {
  // 1: 'some error'
};

const parseJSON = buf => {
  var data, error = new Error();
  try {
    data = JSON.parse(buf);
  } catch (e) {
    // console.log('[youdao-fanyi] parse json error:', e);
    throw new Error(buf.toString());
  }
  const { errorCode } = data;
  if (errorCode in ERROR_CODES) {
    error.message = ERROR_CODES[errorCode];
    error.code = errorCode;
    throw error;
  }
  return data;
};

function Youdao(options) {
  if(typeof options === 'string')
    return Youdao.fanyi.apply(this, arguments);
  if(typeof options !== 'object')
    options = {};
  const {
    key, keyfrom,
    version = '1.1',
    api = 'http://fanyi.youdao.com/openapi.do'
  } = options;
  assert(key, 'key is required');
  assert(keyfrom, 'keyform is required');
  function fanyi(q = '', query, cb) {
    if(typeof query === 'function'){
      cb = query;
      query = {};
    }
    const params = parseURL(api, Object.assign({
      q,
      key,
      keyfrom,
      version,
      type: 'data',
      doctype: 'json',
    }, query));
    return Promise
      .resolve(params)
      .then(get)
      .then(readStream)
      .then(parseJSON)
      .then(res => (cb && cb(null, res), res))
      .catch(err => {
        if(cb) cb(err)
        else throw err;
      });
  }
  return fanyi.fanyi = fanyi;
}

Youdao.__defineGetter__('fanyi', () => {
  // defaults key
  return Youdao({
    key: '2001075261',
    keyfrom: 'LSONGORG'
  });
});

module.exports = Youdao;