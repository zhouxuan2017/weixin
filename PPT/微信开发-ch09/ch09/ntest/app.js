const titbit=require('titbit');
const fs=require('fs');

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

var app=new titbit({
    debug:true//开启调试模式，会输出错误信息
});

var {router}=app;//相当于 var router=app.router

// router.get('/',async c=>{
//     c.res.body='success';
// });
router.get('/upload',async c=>{
    try{
        c.res.body=await readFile('./pages/upload.html');
    }catch(err){
        console.log(err);
       c.res.status(404);
    }
});
router.post('/upload',async c=>{
   // c.res.body=c.body;//c.body是请求提交的数据
   //上传文件实际的数据都在c.rawBody中
   //解析后结果放在c.files里面
   try{
   let imgfile=c.getFile('image');
   c.res.body=await c.moveFile(imgfile,{
       path:'images'
   });
   }catch(err){
   console.log(err);
   c.res.status(500);
   }
});
app.run(8001,'localhost');