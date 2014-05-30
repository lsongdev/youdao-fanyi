#!/usr/bin/env node

const fanyi = require('..');
const pkg = require('../package');

var args = process.argv.slice(2);

const short = args.includes('--short');
if (short) args = args.filter(x => x !== '--short');

fanyi(args.join(' '), function (err, body) {
  if (err) return console.error(err.message);
  if (short) return body.translation.forEach(line => console.log(line));

  const { query, basic, web } = body;

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

  console.log('-', body.translation.join(' / '));

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

});
