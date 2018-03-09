var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://mapi.zowalk.com"',
  BASE_WAP: '"http://wsfm.zowalk.com"',
  MQTT_SERVER_URL: '"mqtt://api.zowalk.com/mqtt"',
  APP_ORIGIN: '"http://m.zowalk.com"',
})
