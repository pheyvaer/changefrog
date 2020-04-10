const semver = require('semver');

async function main(changelogStr, options) {
  let date = options.date;
  let newVersion = options.newVersion;
  let increment = options.increment;

  const lines = changelogStr.split('\n');

  if (!newVersion) {

    if (!increment) {
      throw new Error(`Neither "increment" nor "newVersion" are provided.`);
    }

    const latestVersion = _findLatestVersion(lines);
    newVersion = semver.inc(latestVersion, increment);
  }

  if (!date) {
    date = new Date();
  }

  date = _formatDate(date);

  let temp = changelogStr.replace('## Unreleased', `## Unreleased\n\n## [${newVersion}] - ${date}`);

  let i = 0;

  while (i < lines.length && !lines[i].startsWith('[') && !lines[i].includes(']: ')) {
    i ++;
  }

  const oldVersionUrl = lines[i];

  let url = oldVersionUrl.split(' ')[1];
  let oldVersion = 'v' + oldVersionUrl.split(' ')[0].replace('[', '').replace(']:', '');

  url = url.replace(/v.*\.\.\.v.*/, oldVersion + '...' + 'v' + newVersion);
  temp = temp.replace(oldVersionUrl, `[${newVersion}]: ${url}\n${lines[i]}`);

  return temp;
}

/**
 * This method returns a formatted string of the provided date.
 * @param date The date to be used.
 * @returns {string} The formatted string.
 * @private
 */
function _formatDate(date) {
  let month = '' + (date.getMonth() + 1);

  if (month.length === 1) {
    month = '0' + month;
  }

  let day = '' + date.getUTCDate();

  if (day.length === 1) {
    day = '0' + day;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

function _findLatestVersion(lines) {
  let i = 0;

  while (i < lines.length && !lines[i].startsWith('[') && !lines[i].includes('] - ')) {
    i ++;
  }

  if (i < lines.length) {
    const elements = lines[i].split(' ');
    return elements[1].replace(/\[|\]/g, '');
  } else {
    return null;
  }
}

module.exports = main;
