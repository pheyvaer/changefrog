const assert = require('assert');
const main = require('../index');
const path = require('path');
const fs = require('fs-extra');

describe('Changefrog', function() {
  it('01', async function() {
    const inputFile = path.join(__dirname, '01/input.md');
    const expectedOutputFile = path.join(__dirname, '01/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = await main(inputStr, {increment: 'major', date: new Date('2020-04-10')});
    assert.equal(expected, actual);
  });

  it('02', async function() {
    const inputFile = path.join(__dirname, '02/input.md');
    const expectedOutputFile = path.join(__dirname, '02/expected-output.md');
    const inputStr = await fs.readFile(inputFile, 'utf-8');
    const expected = await fs.readFile(expectedOutputFile, 'utf-8');

    const actual = await main(inputStr, {increment: 'major', date: new Date('2020-04-10')});
    assert.equal(expected, actual);
  });
});
