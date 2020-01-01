const webpack = require('webpack')
const path = require('path')
const config = require('./configs/webpack.config')
const argv = process.argv
let example = 'base'
if (argv.length > 2) {
  example = argv[2]
}
config.entry = path.resolve(__dirname, `${example}/index.js`)
console.log(config)
webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
})
