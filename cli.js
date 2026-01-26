#!/usr/bin/env node

const minimist = require('minimist')
const render = require('.')

const options = {
  alias: { json: 'j', plain: 'p' },
  boolean: ['json', 'plain']
}
const argv = minimist(process.argv.slice(2), options)

render(argv).then(output => {
  if (output) console.log(output)
})
