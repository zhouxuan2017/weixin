const titbit=require('titbit');

var app=new titbit();
app.use(async(c,next)=>{
    console.log('middleware1');
    if(c.query.say==='hey'){
        await next(c);
    }else{
        c.res.body='ss';
    }
    
    console.log('middleware1');
})
app.use(async(c,next)=>{
    console.log('middleware2');
    await next(c);
    console.log('middleware2');
});
// ,{group:'post',method:['POST','PUT']}
//��4.1.3�汾�Ժ󣬿���ֱ��ʹ��app.get�����·��
app.get('/',async c=>{
    c.res.body='success';
})
app.post('/p',async c=>{
    console.log(c.name);
    c.res.body=c.body;
    c.requestCall;
},'@post')
app.run(8119);