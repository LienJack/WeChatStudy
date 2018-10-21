'use strict'

var Koa = require('koa')
const wechat = require('./wechat/g')
const path = require('path')
const util = require('./libs/util')
const wechat_file = path.join(__dirname, './config/wechat.txt')

var sha1 = require('sha1')


var config = {
    wechat: {
        appId:"wxafe307265500bfed",
        AppSecret:"4dd703dbf33d659215fdfd6c6499a095",
        token:"pljc8833",
        getAccessToken: function() {
            return util.readFileAsync(wechat_file, 'UTF-8')
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}
var app = new Koa()

app.use(wechat(config.wechat))
app.listen(8080, () => {
    console.log('run at 8080')
})

