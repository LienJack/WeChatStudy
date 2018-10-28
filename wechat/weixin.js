exports.replay = function* (next){
  var message = this.weixin;
  console.log("message",message)
  if(message.MsgType === 'event'){
    if(message.Event === 'subscribe'){
        if(message.EventKey) {
            console.log('扫描二维码关注：'+ message.EventKey +' '+ message.ticket);
        }
        this.body = '终于等到你，还好我没放弃';
    }else if(message.Event === 'unsubscribe'){
        this.body = '';
        console.log(message.FromUserName + ' 悄悄地走了...');
    }else if(message.Event === 'location'){
        this.body = '您上报的地理位置是：'+ Label;
    }else if(message.Event === 'CLICK'){
        this.body = '您点击了菜单：'+ message.EventKey;
    }else if(message.Event === 'SCAN'){
        this.body = '关注后扫描二维码：'+ message.Ticket;
    }
} else if(message.MsgType === 'location') {
  this.body = '你这个SB就在'+ message.Label;
}
else if(message.MsgType === 'text'){
    var content = message.Content;
    var reply = `你说的话：${content}我听不懂呀,但是可以回复1到4试试`;
    if(content === '1'){
        reply = '先给你续一秒';
    }
    else if(content === '2'){
      reply = [{
        title:'当被陈x基叼的时候怎么办',
        description:'点解了解一下',
        picUrl:'https://mmbiz.qpic.cn/mmbiz_jpg/MbicSgNJeFsBG89VmKRDPQrVdiclSx6JyibP0j4pI1lm3wmBtQR2Z2kopNoTTFCpWicVabiaUw8iaJuicEWpngruAcpiag/640',
        url:'https://jingyan.baidu.com/article/4853e1e5320f251909f72606.html'  //可下载观看喔
      }];
    }
    else if(content === '3'){
      reply = [{
        title:'太鼓巨佬&膜法师',
        description:'猜猜这是谁',
        picUrl:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=715c36208701a18be4e61a1dff466c6d/3801213fb80e7becae6fb3ed2f2eb9389b506b01.jpg',
        url:'https://space.bilibili.com/2754326/#/'  //可下载观看喔
      }];
    } else if(content === '4'){ 
      reply = '试试发送位置给我'
    }

    // ... 其他回复类型

    this.body = reply;
}

  yield next;
}