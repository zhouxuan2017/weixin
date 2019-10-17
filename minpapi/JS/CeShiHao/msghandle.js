const formatMsg=require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助信息
    //还可以是以读取文件的形式来返回
    return '你好，这是一个测试号，目前会原样返回用户输入的消息，暂不支持识别类型'
}
function myself()
{
    return Array("欢迎您关注，现向您介绍开发者基本信息:\n姓名：周宣\n班级：软件工程6班\n学号：2017011961\n方向：h5")
}
/*
   @param {object}wxmsg 解析XML消息的对象
   @param {object}retmsg 要返回的数据对象
*/
function userMsg(wxmsg,retmsg){
  //关键字自动回复
  if(wxmsg.MsgType=='text'){
      switch(wxmsg.Content){
          case '帮助':
          case 'help':
          case '?':
                retmsg.msg=help();
             retmsg.msgtype='text';
             
             return formatMsg(retmsg);
          case 'about':
              retmsg.msgtype='text';
              retmsg.msg='我是这个测试号开发者，如有问题请联系123@1.com';
              return formatMsg(retmsg);
          case 'who':  
              retmsg.msg=myself();
              retmsg.msgtype='text';
              return formatMsg(retmsg);
        default:
            retmsg.msgtype='text';
            retmsg.msg=wxmsg.Content;
            return formatMsg(retmsg);

      }
  }
  //处理其他类型的消息
  switch(wxmsg.MsgType){
      case 'image':
      case 'voice':
          retmsg.msgtype=wxmsg.MsgType;
          retmsg.msg=wxmsg.MediaId;
          return formatMsg(retmsg);
      default:
          //retmsg.msgtype类型为空
          //格式化数据会返回default处的数据
          //提示用户该类型不被支持
          return formatMsg(retmsg);
  }
}
// exports.help=help;
// exports.userMsg=userMsg;
// exports.eventMsg=eventMsg;
function evenMsg(wxmsg,retmsg){
    //把返回消息的类型设置为text
    retmsg.msgtype='text';

    switch(wxmsg.Event){
        case 'subscribe':
            retmsg.msg='你好，这是一个测试号，尽管没什么用，但还是谢谢您的关注。';
            return formatMsg(retmsg);
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;
        case 'CLICK':
            // retmsg.msg = wxmsg.EventKey;
            retmsg.msg=myself();
              retmsg.msgtype='text';
            return formatMsg(retmsg);
        case 'VIEW':
            console.log('用户浏览',wxmsg.EventKey);
            break;
        case 'pic-weixin':
                retmsg.msgtype=wxmsg.MsgType;
                retmsg.msg=wxmsg.MediaId;
                return formatMsg(retmsg);
                break;
        case 'pic_sysphoto':
                retmsg.msgtype=wxmsg.MsgType;
                retmsg.msg=wxmsg.MediaId;
                return formatMsg(retmsg);  
                break;
        case 'pic_photo_or_album':
                retmsg.msgtype=wxmsg.MsgType;
                retmsg.msg=wxmsg.MediaId;
                return formatMsg(retmsg);
                break;
       case 'location_select':
            retmsg.msgtype=wxmsg.MsgType;
                retmsg.msg=wxmsg.MediaId;
                return formatMsg(retmsg);
                
        default:
            return '';
    }
    return '';
}

//后续还会加入事件消息支持
exports.msgDispatch=function(wxmsg,retmsg){
    if(wxmsg.MsgType == 'event'){
        return evenMsg(wxmsg,retmsg);
    }
    return userMsg(wxmsg,retmsg);
}