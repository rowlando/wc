const test = require('node:test');
const assert = require('node:assert');
const parseArgs = require('../parseArgs');

test('ccwc command line argument parsing', async (t) => {
  await t.test('should parse flag and filename when flag is provided', () => {
    const args = ['node', 'script.js', '-l', 'test.txt'];
    const { flag, filename } = parseArgs(args);

    assert.strictEqual(flag, '-l');
    assert.strictEqual(filename, 'test.txt');
  });

  await t.test('should parse filename only when no flag is provided', () => {
    const args = ['node', 'script.js', 'test.txt'];
    const { flag, filename } = parseArgs(args);

    assert.strictEqual(flag, null);
    assert.strictEqual(filename, 'test.txt');
  });
});
