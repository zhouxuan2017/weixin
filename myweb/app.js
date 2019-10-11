const titbit = require('titbit');
const fs =require('fs');

//async function 用来定义一个返回 AsyncFunction 对象的异步函数。
async function readFile(filename, encoding ='utf8'){
    return new Promise((rv,rj)=>{
        fs.readFile(filename,{encoding:encoding},(err,data)=>{
            if(err){
                rj(err);
            }else{
                rv(data);
            }
        })
    })
}
//读取HTML页面数据、默认目录pages
async function loadPage(pagename,pagedir='./pages'){
    let pagefile= `${pagedir}/${pagename}.html`;
    return await readFile(pagefile);
}
//读取静态文件
async function loadStatic(stfile){
    let filepath=`./ststic/${stfile}`;
    return await readFile(filepath);
}

var app=new titbit({
    //开启调试模式，输出错误信息
    debug:true,
    //不输出负载信息
    showLoadInfo:false,
});
//相当于 var router =app.router
var {router} =app;

router.get('/',async c=>{
    try{
        c.res.body=await loadPage('home');
    }catch(err)
    {
        c.res.status(404);
    }
});

//返回其他页面
router.get('/:name',async c=>{
    try{
        c.res.body=await loadPage(c.param.name);
    }catch(err){
        c.res.body=await loadPage('404','errorpages');
        c.res.status(404);
    }
});
//返回图片数据
router.get('/image/:name',async c=>{
    try{
        let content_type='';
        /**
         * c.helper.extName是助手函数，用于返回文件的扩展名
         * 传递参数为文件名称字符串。
         */
        let extname =c.helper.extName(c.param.name);

        switch(extname.toLowerCase()){
            case '.png':
                content_type='image/png';break;
            case '.jpg':
            case '.jpeg':
                content_type='image/jpeg';break;
            case '.gif':
                content_type='image/gif';break;
            default:;
        }
        //设置返回内容的头信息
        c.res.setHeader('content_type',content_type);
        //读取文件数据、二进制编码
        let data = await readFile('./images/'+c.param.name,'binary');
        //设置返回数据的长度信息
        c.res.setHeader('content-length',data.length);
        //返回数据格式为二进制
        c.res.encoding='binary';
        //返回图片数据
        c.res.body=data;
    }catch(err){
        c.res.status(404);
    }
});

router.get('/api/:name',async c=>{
    try{
        c.res.body=await readFile('./apifile/'+c.param.name);
    }catch(err){
        c.res.status(404);
    }
})

if(process.argv.indexOf('-d')>0){
    app.config.daemon=true;//开启守护进程模式
    app.config.showLoadInfo=true;//显示系统负载信息
}
//使用daemon 后续可以开启dameon模式用于后台信息
app.daemon(8000,'localhost');
