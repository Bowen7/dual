const webpack = require('webpack')
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./configs/webpack.config')
const argv = process.argv
let example = 'base'
if (argv.length > 2) {
  example = argv[2]
}

config.entry = path.resolve(__dirname, `${example}/index.js`)

const compiler = webpack(config)
const devServerOptions = Object.assign({}, config.devServer, {
  open: true,
  stats: {
    colors: true
  }
})
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080')
})
