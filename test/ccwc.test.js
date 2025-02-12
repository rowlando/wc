const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs/promises');
const path = require('node:path');
const wc = require('../ccwc');

test('ccwc functionality', async (t) => {
  // Test file configurations
  const testFiles = {
    small: {
      path: path.join(__dirname, 'test-small.txt'),
      content: 'Hello, World!\nThis is a test.\n'
    }
  };

  // Setup: Create test files
  await t.before(async () => {
    await Promise.all([
      fs.writeFile(testFiles.small.path, testFiles.small.content),
    ]);
  });

  // Test groups for different file sizes
  await t.test('small file tests', async (t) => {
    await t.test('byte count (-c flag)', async () => {
      const result = await wc(testFiles.small.path, '-c');
      assert.equal(result, `${testFiles.small.content.length} ${testFiles.small.path}`);
    });

    await t.test('line count (-l flag)', async () => {
      const result = await wc(testFiles.small.path, '-l');
      const expectedLines = 2; // Two newlines
      assert.equal(result, `${expectedLines} ${testFiles.small.path}`);
    });

    await t.test('word count (-w flag)', async () => {
      const result = await wc(testFiles.small.path, '-w');
      const expectedWords = 6; // "Hello", "World", "This", "is", "a", "test"
      assert.equal(result, `${expectedWords} ${testFiles.small.path}`);
    });

    await t.test('character count (-m flag)', async () => {
      const result = await wc(testFiles.small.path, '-m');
      assert.equal(result, `${testFiles.small.content.length} ${testFiles.small.path}`);
    });

    await t.test('default output (no flag)', async () => {
      const result = await wc(testFiles.small.path, null);
      const expectedBytes = testFiles.small.content.length;
      const expectedLines = 2;
      const expectedWords = 6;
      assert.equal(result, `${expectedBytes} ${expectedLines} ${expectedWords} ${testFiles.small.path}`);
    });
  });

  await t.test('error handling', async (t) => {
    await t.test('handles non-existent file', async () => {
      await assert.rejects(
        async () => await wc('nonexistent.txt', '-c'),
        /Error processing file/
      );
    });

    await t.test('handles invalid flag', async () => {
      const result = await wc(testFiles.small.path, '-x');
      assert.equal(result, '');
    });
  });

  // Cleanup: Remove test files
  await t.after(async () => {
    await Promise.all([
      fs.unlink(testFiles.small.path)
    ]);
  });
});
