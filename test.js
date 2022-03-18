const assert = require('assert');
const ngram = require('./ngram.js');

it('throws error with invalid arguments', () => {
  let foo = () => ngram.findNGrams('a', 'foo');
  assert.throws(foo, Error);
});

it('sample bigram', () => {
  let test = ngram.findBigrams('The quick brown fox and the quick blue hare.');
  test.sort();

  let actual = ['the quick',
    'the quick',
    'quick brown',
    'brown fox',
    'fox and',
    'and the',
    'quick blue',
    'blue hare',
  ];
  actual.sort();

  assert.deepEqual(test, actual);
});

it('string with no alphabetic characters returns no n-grams', () => {
  assert.deepEqual([],
    ngram.findBigrams('...\n,%'));
});

it('shows correct counts for sample string', () => {
  const actual = {
    'the quick': 2,
    'quick brown': 1,
    'brown fox': 1,
    'fox and': 1,
    'and the': 1,
    'quick blue': 1,
    'blue hare': 1,
  };
  const test = ngram.countNGrams(['the quick',
    'the quick',
    'quick brown',
    'brown fox',
    'fox and',
    'and the',
    'quick blue',
    'blue hare',
  ]);

  assert.deepEqual(actual, test);
});

it('shows empty counts for an empty array', () => {
  assert.deepEqual({}, ngram.countNGrams([]));
});
