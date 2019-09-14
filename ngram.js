'use strict';

/**
 * search given string for n-gram of size numGram
 *
 * @param {string} numGram size of n-gram
 * @param {string} str string to search
 * @return {object} {n-gram: count...}
 */
exports.findNGrams = function(numGram, str) {
  // array containing found n-grams
  let grams = [];

  if (isNaN(numGram) || typeof numGram !== "number") {
    throw new Error("n-gram number must be an integer");
  }

  // creates words array:
  //  convert string to lowercase,
  //  remove non-alphabetic characters
  //  remove excess whitespace at the beginning and end of string
  //  split by any number (>1) of contiguous whitespace
  const words = str
                .toLowerCase()
                .replace(/[^a-z\s]/g, '')
                .trim()
                .split(/\s+/);

  // loop through words array to create new array of ngrams
  for(let i = 0, c = words.length - (numGram - 1); i < c; i++) {
    // take array slice of words and join with space to make current gram
    const currentGram = words.slice(i, i + numGram).join(" ");
    grams.push(currentGram);
  }

  return grams;
}

/**
 * search given string for bigrams, utility function uses findNGrams
 *
 * @param {string} str string to search
 * @return {object} {bigram: count...}
 */
exports.findBigrams = function(str) {
  return this.findNGrams(2, str);
}

/**
 * condense array of n-grams to object where {ngram1: count1, ngram2: count2...}
 *
 * @param {string} grams array of n-grams
 * @return {object} {n-gram: count...}
 */
exports.countNGrams = function(grams) {
  let counts = {};

  // loop through grams array to count occurrences of each n-gram
  grams.forEach((currentGram) =>
    counts[currentGram] = 1 + (counts.hasOwnProperty(currentGram) ? counts[currentGram] : 0)
  );

  return counts;
}
