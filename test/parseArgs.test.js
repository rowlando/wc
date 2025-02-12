const test = require('node:test');
const assert = require('node:assert');
const parseArgs = require('../parseArgs');

test('parseArgs', async (t) => {
  await t.test('valid cases', async (t) => {
    await t.test('parses filename only', () => {
      const result = parseArgs(['node', 'script.js', 'file.txt']);
      assert.deepStrictEqual(result, { flag: null, filename: 'file.txt' });
    });

    await t.test('parses flag and filename', () => {
      const result = parseArgs(['node', 'script.js', '-l', 'file.txt']);
      assert.deepStrictEqual(result, { flag: '-l', filename: 'file.txt' });
    });
  });

  await t.test('error cases', async (t) => {
    await t.test('throws on missing filename', () => {
      assert.throws(
        () => parseArgs(['node', 'script.js']),
        /Missing required filename argument/
      );
    });

    await t.test('throws on missing filename after flag', () => {
      assert.throws(
        () => parseArgs(['node', 'script.js', '-l']),
        /Missing required filename after flag/
      );
    });

    await t.test('throws on too many arguments without flag', () => {
      assert.throws(
        () => parseArgs(['node', 'script.js', 'file.txt', 'extra']),
        /Too many arguments/
      );
    });

    await t.test('throws on too many arguments with flag', () => {
      assert.throws(
        () => parseArgs(['node', 'script.js', '-l', 'file.txt', 'extra']),
        /Too many arguments/
      );
    });
  });
});
