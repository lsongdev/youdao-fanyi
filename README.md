# youdao-fanyi

[![Build Status](https://travis-ci.org/song940/youdao-fanyi.svg?branch=next)](https://travis-ci.org/song940/youdao-fanyi)

> Simple API for [有道智云翻译](https://ai.youdao.com/product-fanyi.s) in JavaScript

[![NPM](https://nodei.co/npm/youdao-fanyi.png?downloads=true&stars=true)](https://nodei.co/npm/youdao-fanyi/)


**>> youdao-fanyi old versions please checkout [master branch](https://github.com/song940/youdao-fanyi/tree/master) <<**


## Installation

```bash
~$ npm i youdao-fanyi
```

## Example

```javascript
const Youdao = require('youdao-fanyi');

const fanyi = Youdao({
  appkey: '-- Here is your appkey --',
  secret: '-- Here is your secret --',
});

fanyi('hello world', (err, res) => {
  if(err) return console.error(err);
  console.log(res);
  // { tSpeakUrl:
  //  'http://openapi.youdao.com/ttsapi?q=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E4%B8%96%E7%95%8C&langType=zh-CHS&sign=9118F94311541AB2F28285D6A6A48999&salt=1562037565470&voice=4&format=mp3&appKey=072f0aceb09ad0a9',
  // returnPhrase: [ 'hello world' ],
  // web:
  //  [ { value: [Array], key: 'hello world' },
  //    { value: [Array], key: 'Hello Kitty World' },
  //    { value: [Array], key: 'Hello Cold World' } ],
  // query: 'hello world',
  // translation: [ '你好，世界' ],
  // errorCode: '0',
  // dict: { url: 'yddict://m.youdao.com/dict?le=eng&q=hello+world' },
  // webdict: { url: 'http://m.youdao.com/dict?le=eng&q=hello+world' },
  // basic:
  //  { 'uk-speech':
  //     'http://openapi.youdao.com/ttsapi?q=hello+world&langType=en&sign=8E11700E7BAFBB1930EE80499051F0EE&salt=1562037565470&voice=5&format=mp3&appKey=072f0aceb09ad0a9',
  //    explains: [ '你好世界' ],
  //    'us-speech':
  //     'http://openapi.youdao.com/ttsapi?q=hello+world&langType=en&sign=8E11700E7BAFBB1930EE80499051F0EE&salt=1562037565470&voice=6&format=mp3&appKey=072f0aceb09ad0a9' },
  // l: 'en2zh-CHS',
  // speakUrl:
  //  'http://openapi.youdao.com/ttsapi?q=hello+world&langType=en&sign=8E11700E7BAFBB1930EE80499051F0EE&salt=1562037565470&voice=4&format=mp3&appKey=072f0aceb09ad0a9' }

});

```

see more usage case in [test](./test/index.js).

## Licence

The MIT License (MIT)

Copyright (c) 2014 [Lsong](https://github.com/song940)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
