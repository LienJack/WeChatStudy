const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
var util = require('./util')
var prefix = 'https://api.weixin.qq.com/cgi-bin/token'
var api = {
  access_token: prefix + '?grant_type=client_credential',
}


function Wechat(opts) {
  let that = this
  this.appId = opts.appId
  this.AppSecret = opts.AppSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken

  this.getAccessToken()
    .then(function(data) {
      try {
        data = JSON.parse(data)
      } catch(e) {
        return that.updateAccessToken(data)
      }
      if (that.isValidAccessToken(data)) {
        that.access_token =data.access_token
        that.expires_in = data.expires_in
        return new Promise((resolve,reject) => {
          resolve(data)
        })
      } else {
        return that.updateAccessToken()
      }
    })
    .then(function(data){
      that.access_token =data.access_token
      that.expires_in = data.expires_in
      that.saveAccessToken(data)
    })
}
Wechat.prototype.isValidAccessToken = function (data) {
  if(!data || !data.access_token || !data.expires_in) { return false }
  let access_token = data.access_token
  let expires_in = data.expires_in
  let now = (new Date().getTime())
  if (now < expires_in) {
    return true
  } else {
    return false
  }
}

Wechat.prototype.updateAccessToken = function () {
  let appID = this.appId
  let AppSecret = this.AppSecret
  let url = `${api.access_token}&appid=${appID}&secret=${AppSecret}`
  return new Promise((resolve, reject) => {
    request({url:url, json: true}).then(res => {
      let data =res.body
      let now = (new Date().getTime())
      let expires_in = now + (data.expires_in -20) * 1000
      data.expires_in = expires_in
      resolve(data)
    })
  })
}

Wechat.prototype.replay = function() {
  var content = this.body
  var message = this.weixin
  var xml = util.tpl(content, message)
  this.status = 200
  this.type = 'application/xml'
  this.body = xml
  console.log("content",this.body)
}
module.exports = Wechat