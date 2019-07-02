const https = require('https');
const assert = require('assert');
const crypto = require('crypto');
const querystring = require('querystring');

const post = (url, body) =>
  new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, resolve);
    req.on('error', reject);
    if (body) {
      if (typeof body !== 'string') 
        body = querystring.stringify(body);
      req.write(body);
    }
    req.end();
  });

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

const ERROR_CODES = {
  // 0: '正常',

};

const parseJSON = buf => {
  var data, error = new Error();
  try {
    data = JSON.parse(buf);
  } catch (e) {
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

function getInput(input) {
  if (input.length == 0) {
    return null;
  }
  var result;
  var len = input.length;
  if (len <= 20) {
    result = input;
  } else {
    var startStr = input.substring(0, 10);
    var endStr = input.substring(len - 10, len);
    result = startStr + len + endStr;
  }
  return result;
}

const createSign = (appKey, appSecret, query) => {
  const salt = new Date().getTime() + Math.random();
  const curtime = Math.round(new Date().getTime() / 1000);
  const str = appKey + getInput(query) + salt + curtime + appSecret;
  const sha256 = crypto.createHash('sha256');
  const sign = sha256.update(str).digest('hex');
  return {
    sign,
    salt,
    appKey,
    curtime,
    signType: "v3"
  };
};

/**
 * Youdao Translate API
 * @docs http://ai.youdao.com/docs/doc-trans-api.s#p01
 * @param {*} options 
 */
function Youdao(options) {
  if (typeof options === 'string')
    return Youdao.fanyi.apply(this, arguments);
  if (typeof options !== 'object')
    options = {};
  const {
    appkey, secret,
    api = 'https://openapi.youdao.com/api'
  } = options;
  assert(appkey, 'appkey is required');
  assert(secret, 'secret is required');
  function fanyi(q = '', query, cb) {
    query = query || {};
    if (typeof query === 'function') {
      cb = query;
      query = {};
    }
    const sign = createSign(appkey, secret, q);
    const params = Object.assign({
      q,
      to: 'auto',
      from: 'auto',
    }, query, sign);
    return Promise
      .resolve()
      .then(() => post(api, params))
      .then(readStream)
      .then(parseJSON)
      .then(res => (cb && cb(null, res), res))
      .catch(err => {
        if (cb) cb(err)
        else throw err;
      });
  }
  return fanyi.fanyi = fanyi;
}

module.exports = Youdao;