

'use strict'

const sha1 = require('sha1')
const getRawBody = require('raw-body')
const Wechat = require('./wechat')
const util = require('./util')

var prefix = 'https://api.weixin.qq.com/cgi-bin/token'
var api = {
  access_token: prefix + '?grant_type=client_credential',
}



module.exports = function(opts, handler) {
  const wechat = new Wechat(opts)
  return function *(next) {
    // console.log(this.query)
    let that = this
    let token = opts.token
    let signature = this.query.signature
    let nonce = this.query.nonce
    let timestamp = this.query.timestamp
    let ehcostr = this.query.echostr
    let str = [token, timestamp, nonce].sort().join('')
    let sha = sha1(str)
    if(this.method === 'GET') {
      if (sha === signature) {
        this.body = ehcostr + ''
      } else {
          this.body = 'wrong'
      }
    } else if(this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong'
        return false
      }
      let data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.chartset
      })
      // console.log(data.toString())
      let content = yield util.parseXMLAsync(data)
      // console.log(content)
      let message = util.formatMessage(content.xml)
      // console.log(message)
      this.weixin = message
      yield handler.call(this, next)
      wechat.replay.call(this)
    }
   
  }
}
