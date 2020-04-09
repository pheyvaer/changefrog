async function main(changelogStr, newVersion, date) {
  if (!date) {
    date = new Date();
  }

  // TODO format date.

  let temp = changelogStr.replace('## Unreleased', `## Unreleased\n\n## [${newVersion}] - ${date}`);
  const lines = temp.split('\n');

  let i = 0;

  while (i < lines.length && !lines[i].startsWith('[') && !lines[i].includes(']: ')) {
    i ++;
  }

  const oldVersionUrl = lines[i];

  let url = oldVersionUrl.split(' ')[1];
  let oldVersion = 'v' + oldVersionUrl.split(' ')[0].replace('[', '').replace(']:', '');

  url = url.replace(/v.*\.\.\.v.*/, oldVersion + '...' + 'v' + newVersion);
  temp = temp.replace(oldVersionUrl, `[${newVersion}]: ${url}\n${lines[i]}`);

  console.log(temp);
  return temp;
}

main(`
# changelog title
 
A cool description (optional).
 
## Unreleased

* foo
 
## x.y.z - YYYY-MM-DD (or DD.MM.YYYY, D/M/YY, etc.)
* bar
 
## [a.b.c]
 
### Changes
 
* Update API
* Fix bug #1
 
## 2.2.3-pre.1 - 2013-02-14
* Update API
 
## 2.0.0-x.7.z.92 - 2013-02-14
* bark bark
* woof
* arf
 
## v1.3.0
 
* make it so
 
## [1.2.3](link)
* init
 
[0.2.0]: https://github.com/RMLio/yarrrml-parser/compare/v0.1.6...v0.2.0
[0.1.6]: https://github.com/RMLio/yarrrml-parser/compare/v0.1.5...v0.1.6
`, '2.0.0');
