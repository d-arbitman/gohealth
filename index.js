'use strict';

const ngram = require('./ngram.js');
const fs = require('fs');

if (process.argv.length <= 2 || process.argv[2] == "-h" || process.argv[2] == "--help") {
  usage();
}

// use first argument as file to read from
const file = process.argv[2];

try {
  // read specified file
  const contents = fs.readFileSync(file, 'utf8');

  const bigrams = ngram.findBigrams(contents);
  const counts = ngram.countNGrams(bigrams);

  // console.log keys/associated counts in counts
  for(let key in counts) {
    console.log(`${key}: ${counts[key]}`);
  }
} catch(err) {
  console.error(err.message);
  process.exit(1);
}

function usage() {
  console.log("usage: ", process.argv[1], " [file]");
  process.exit(1);
}
