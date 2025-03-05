const { render } = require('prettyjson');
const data = require('./lib/data');

const renderOpts = {
    dashColor: 'green',
    keysColor: 'blue',
    dashWidth: 2,
    keysWidth: 20,
    noColor: false,
    showLineNumbers: false,
}

module.exports = ({ json }) => json ? JSON.stringify(data) : render(data, renderOpts)
