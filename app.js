'use strict'

var Koa = require('koa')
const wechat = require('./wechat/g')
const path = require('path')
const util = require('./libs/util')
const config = require('./wechat/config')
const weixin = require('./wechat/weixin')
const wechat_file = path.join(__dirname, './config/wechat.txt')



var app = new Koa()

// app.use(wechat(config.wechat, weixin.replay))
app.use(wechat(config.wechat, weixin.replay))
app.listen(8080, () => {
    console.log('run at 8080')
})

