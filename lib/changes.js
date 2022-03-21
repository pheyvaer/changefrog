module.exports = (changelogStr, version) => {
  const lines = changelogStr.split('\n');

  let i = 0;

  while (
    i < lines.length &&
    !(lines[i].startsWith('## [') &&
      lines[i].includes('] - ') &&
      lines[i].split(' ')[1].replace(/\[|\]/g, '') === version)
    ) {
    i++;
  }

  if (i >= lines.length) {
    // Version not found.
    throw new Error(`Version ${version} was not found.`);
  }

  const logLines = [];
  i++;

  while (
    i < lines.length &&
    !((lines[i].startsWith('## [') && lines[i].includes('] - ')) ||
      (lines[i].includes('[') && lines[i].includes(']:')))
    ) {
    logLines.push(lines[i]);
    i++;
  }

  if (logLines[0] === '') {
    logLines.shift();
  }

  if (logLines[logLines.length - 1] === '') {
    logLines.pop();
  }

  return logLines.join('\n');
}