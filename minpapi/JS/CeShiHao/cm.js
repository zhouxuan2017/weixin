const gohttp=require('gohttp');
const wxkey=require('./gzhkey');


var token_api=`https://api.weixin.qq.com/cgi-bin/token`
             +`?grant_type=client_credential`
             +`&appid=${wxkey.appid}&secret=${wxkey.secret}`



var menu_data={
    button:[
        {
          name:'发图',
          type:'pic_weixin',
          key:'my-image',
          sub_button:[
              {name:'微信相册发图',type:'pic_weixin',key:'image'},
              {name:'系统拍照发图',type:'pic_sysphoto',key:'paizhao'},
              {name:'拍照或相册发图',type:'pic_photo_or_album',key:'ppp'}
          ]
        },
        {
           name:"跳转",
           type:'view',
           url:'https://www.linux.org',
           sub_button:[
            {name:'linux',type:'view',url:'https://www.linux.org'},
            {name:'百度',type:'view',url:'https://www.baidu.com'},
            {name:'搜狗',type:'view',url:'http://www.soso.com'},
            {name:'github',type:'view',url:'https://github.com/zhouxuan2017/weixin/tree/master/zuoye'}
        ]
        },
        {
           name:'点击',
           type:'click',
           key:'这是我的key值，我以原样返回了',
           sub_button:[
            {name:'扫码',type:'scancode_push',key:'push'},
            {name:'位置',type:'location_select',key:"系统已收到您的相关位置，请稍等"},
            {name:'关于',type:'click',key:'你好，我是2017级软件工程六班周宣，专业方向是H5'}
        ]
        }
    ]
}
async function createMenu(){
    let ret=await gohttp.get(token_api);
    let t=JSON.parse(ret);
    //如果没有成功获取access_token则输出错误信息并退出
    if(t.access_token===undefined){
        console.log(ret);
        process.exit(-1);
    }
    var create_menu_api=`https://api.weixin.qq.com/cgi-bin/menu/create`
                    +`?access_token=${t.access_token}`;

       ret=await gohttp.post(create_menu_api,{
            body:menu_data,
            headers:{
              //此扩展消息头的key值都应该小写
              'content-type':'text.plain'
            }
        });

    //输出处理结果
    console.log(ret);
}

createMenu();