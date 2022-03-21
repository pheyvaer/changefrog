#!/usr/bin/env node

const {program} = require('commander');
const fs = require('fs-extra');
const path = require('path');
const pkg = fs.readJsonSync(path.join(__dirname, '../package.json'));
const changelog = require('../lib/changelog');
const getChanges = require('../lib/changes');

program.version(pkg.version);

program
  .option('-d, --date <date>', 'Date of new version.', 'today')
  .option('-r, --dry-run', 'Do not update file, but output updated file instead.')
  .option('-f, --file <path>', 'Path of CHANGELOG file.', 'CHANGELOG.md')
  .option('-i, --increment <string>', 'Auto-increment version number with major, minor, or patch.')
  .option('-c, --changes <string>', 'Get changelog for given version number.')
  .option('-n, --new-version <semver>', 'New version.');

program.parse();

const options = program.opts();

if (!options.date) {
  options.date = new Date();
}

if (options.increment && options.newVersion) {
  console.error('Options -i, --increment and -n, --new-version cannot be used together.');
  process.exit(1);
}

if (!(options.increment || options.newVersion || options.changes)) {
  console.error('Please provide');
  console.error('  - an increment via -i, --increment');
  console.error('  - a new version via -n, --new-version, or');
  console.error('  - an existing version via -c, --changes.');
  process.exit(1);
}

if (!path.isAbsolute(options.file)) {
  options.file = path.join(process.cwd(), options.file);
}

const changelogStr = fs.readFileSync(options.file, 'utf-8');

main();

async function main() {
  try {
    if (options.changes) {
      const changes = getChanges(changelogStr, options.changes);
      console.log(changes);
    } else {
      const updateChangelog = await changelog(changelogStr, {
        increment: options.increment,
        newVersion: options.newVersion
      });

      if (options.dryRun) {
        console.log(updateChangelog);
      } else {
        fs.writeFile(options.file, updateChangelog);
      }
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
