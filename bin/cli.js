#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const pkg = fs.readJsonSync(path.join(__dirname, '../package.json'));
const main = require('../index');

program.version(pkg.version);

program
  .option('-d, --date <date>', 'Date of new version.', 'today')
  .option('-r, --dry-run', 'Do not update file, but output updated file instead.')
  .option('-f, --file <path>', 'Path of CHANGELOG file.', 'CHANGELOG.md')
  .option('-i, --increment <string>', 'Auto-increment version number with major, minor, or patch.')
  .option('-n, --new-version <semver>', 'New version.');

program.parse(process.argv);

if (!program.date) {
  program.date = new Date();
}

if (program.increment && program.newVersion) {
  console.error('Options -i, --increment and -n, --new-version cannot be used together.');
  process.exit(1);
}

if (!path.isAbsolute(program.file)) {
  program.file = path.join(process.cwd(), program.file);
}

const changelogStr = fs.readFileSync(program.file, 'utf-8');

main(changelogStr, {
  increment: program.increment,
  newVersion: program.newVersion
}).then(updateChangelog => {
  if (program.dryRun) {
    console.log(updateChangelog);
  } else {
    fs.writeFile(program.file, updateChangelog);
  }
}).catch(err => {
  console.error(err);
  process.exit(1);
});
