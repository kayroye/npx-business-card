const chalk = require('chalk');
const data = require('./lib/data');

const green = chalk.green;
const dimGreen = chalk.green.dim;
const boldGreen = chalk.green.bold;
const cyan = chalk.cyan;

const BOX_WIDTH = 62;

function pad(str, len) {
  const stripped = str.replace(/\x1b\[[0-9;]*m/g, '');
  const diff = len - stripped.length;
  return diff > 0 ? str + ' '.repeat(diff) : str;
}

function buildLines() {
  const inner = BOX_WIDTH - 4; // 2 for border, 2 for inner padding

  const top    = dimGreen('\u2554' + '\u2550'.repeat(BOX_WIDTH - 2) + '\u2557');
  const bottom = dimGreen('\u255a' + '\u2550'.repeat(BOX_WIDTH - 2) + '\u255d');
  const empty  = dimGreen('\u2551') + ' '.repeat(BOX_WIDTH - 2) + dimGreen('\u2551');

  const line = (content) => {
    return dimGreen('\u2551') + '  ' + pad(content, inner) + dimGreen('\u2551');
  };

  const separator = dimGreen('\u2551') + '  ' + dimGreen('\u2500'.repeat(inner - 10)) + ' '.repeat(10) + dimGreen('\u2551');

  const lines = [
    top,
    empty,
    line(boldGreen(data.name)),
    separator,
    line(green(data.title)),
    empty,
  ];

  const labels = Object.keys(data.links);
  const maxLabel = Math.max(...labels.map(l => l.length));

  for (const [label, url] of Object.entries(data.links)) {
    const paddedLabel = label.padEnd(maxLabel);
    lines.push(line(green(paddedLabel) + '  ' + cyan(url)));
  }

  lines.push(empty);
  lines.push(bottom);

  return lines;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function render({ json, plain } = {}) {
  if (json) {
    return JSON.stringify(data);
  }

  const lines = buildLines();

  if (plain) {
    return lines.join('\n');
  }

  for (const line of lines) {
    process.stdout.write(line + '\n');
    await sleep(60);
  }

  return null;
}

module.exports = render;
