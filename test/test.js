const assert = require('assert');
const changelog = require('../lib/changelog');
const getChanges = require('../lib/changes');
const path = require('path');
const fs = require('fs-extra');

describe('Update changelog', function() {
  it('01', async function() {
    const inputFile = path.join(__dirname, '01/input.md');
    const expectedOutputFile = path.join(__dirname, '01/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = await changelog(inputStr, {increment: 'major', date: new Date('2020-04-10')});
    assert.strictEqual(expected, actual);
  });

  it('02', async function() {
    const inputFile = path.join(__dirname, '02/input.md');
    const expectedOutputFile = path.join(__dirname, '02/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = await changelog(inputStr, {increment: 'major', date: new Date('2020-04-10')});
    assert.strictEqual(expected, actual);
  });
});

describe('Get changes', function() {
  it('Existing version', async function() {
    const inputFile = path.join(__dirname, '03/input.md');
    const expectedOutputFile = path.join(__dirname, '03/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = getChanges(inputStr, '0.2.0');
    assert.strictEqual(expected, actual);
  });

  it('Non-existing version', async function() {
    const inputFile = path.join(__dirname, '04/input.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');

    let error;

    try {
      getChanges(inputStr, '0.2.1');
    } catch (e) {
      error = e;
    } finally {
      assert.strictEqual(`Version 0.2.1 was not found.`, error.message);
    }
  });

  it('Existing version at top of file', async function() {
    const inputFile = path.join(__dirname, '05/input.md');
    const expectedOutputFile = path.join(__dirname, '05/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = getChanges(inputStr, '1.0.0');
    assert.strictEqual(expected, actual);
  });

  it('Existing version at bottom of file', async function() {
    const inputFile = path.join(__dirname, '06/input.md');
    const expectedOutputFile = path.join(__dirname, '06/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = getChanges(inputStr, '0.1.6');
    assert.strictEqual(expected, actual);
  });
});
