const titbit = require('titbit');
const fs = require('fs');

async function readFile(filename,encoding='utf8'){
    return new Promise((rv,rj)=>{
        fs.readFile(filename,{encoding:encoding},(err,data)=>{
            if(err){
                rj(err);
            }else{
                rv(data);
            }
        });
    });
}

var app = new titbit({
    debug:true//开启调解模式，会输出错误信息
});

var {router} = app;//等价于var router = app.router; app.router是new出来的

router.get('/upload',async c =>{
  //  c.res.body = 'success';//async 直接复制
  try{
      c.res.body = await readFile('pages/upload.html');
  }catch(err){
    console.log(err);
    c.res.status(404);
  }
});

router.post('/upload',async c=>{
//    c.res.body = c.body;//c.body是请求提交的数据；res.body是返回的数据
    //上传的文件实际都在c.rawBody中
    //解析完的结果放在c.files中
    try{
        let imgfile = c.getFile('image');//image是上传的文件的name属性,-1表示整个数组去循环
        c.res.body = await c.moveFile(imgfile,{
            path:'images'
        });

    }catch(err){
        console.log(err);
        c.res.status(500);
    }
});

app.run(8000,'localhost');