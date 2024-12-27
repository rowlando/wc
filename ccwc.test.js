const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const getFileSize = require('./ccwc');

test('ccwc file size functionality', async (t) => {
  // Create a temporary test file
  const testFilePath = path.join(__dirname, 'test.txt');
  const testContent = 'Hello, World!';

  // Set up: Create test file before running tests
  t.before(() => {
    fs.writeFileSync(testFilePath, testContent);
  });

  await t.test('should return file size when -c flag is used', (t) => {
    return new Promise((resolve) => {
      getFileSize(testFilePath, '-c', (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(result, `${testContent.length} ${testFilePath}`);
        resolve();
      });
    });
  });

  await t.test('should return empty string when flag is not -c', (t) => {
    return new Promise((resolve) => {
      getFileSize(testFilePath, '-x', (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(result, '');
        resolve();
      });
    });
  });

  await t.test('should return error for non-existent file', (t) => {
    return new Promise((resolve) => {
      getFileSize('nonexistent.txt', '-c', (err, result) => {
        assert.ok(err instanceof Error);
        assert.ok(err.message.includes('ENOENT'));
        resolve();
      });
    });
  });

  // Clean up: Remove test file after all tests complete
  t.after(() => {
    fs.unlinkSync(testFilePath);
  });
});
