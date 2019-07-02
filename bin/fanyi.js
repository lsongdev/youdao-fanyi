#!/usr/bin/env node

const fanyi = require('..');
const pkg = require('../package');

const { isTTY } = process.stdin;

var args = process.argv.slice(2);

const short = args.includes('--short');
if (short) args = args.filter(x => x !== '--short');

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

Promise
  .resolve()
  .then(() => isTTY ? args.join(' ') : readStream(process.stdin))
  .then(buf => buf.toString())
  .then(fanyi)
  .catch(err => {
    console.error('ERROR:', err.message, `(#${err.code})`);
    process.exit(1);
  })
  .then(body => {
    const { query, basic, web, translation } = body;
    if (short && translation) return console.log(translation.join('\n'));

    console.log();
    console.log(` ${pkg.name}@${pkg.version}`);
    console.log();
    process.stdout.write(`~ ${query} `);

    if (basic) {
      const a = basic['phonetic'];
      const b = basic['us-phonetic'];
      const c = basic['uk-phonetic'];
      if (a) process.stdout.write(`[${a}] `);
      if (b && b !== a) process.stdout.write(`US: [${b}] `);
      if (c && c !== a) process.stdout.write(`UK: [${b}] `);
    }

    if(translation){
      console.log('-', translation.join(' / '));
    }

    if (basic && basic.explains) {
      console.log();
      basic.explains.forEach(explain => {
        console.log('-', explain);
      });
    }

    if (web) {
      console.log();
      web.forEach((word, i) => {
        console.log(`${i + 1}. ${word.key}`);
        console.log('  ', word.value.join(' / '));
      });
    }
  })