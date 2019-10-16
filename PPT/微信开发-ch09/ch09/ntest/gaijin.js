const http=require('http');
const url=require('url');
const qs=require('querystring');

var router=function(){
    if(!(this instanceof router)){
        return new router();
    }
    this.routeTable={
        'GET':{},
        'POST':{},
        'PUT':{},
        'DELETE':{},
        'OPTIONS':{}
    };

    this.addPath=function(method,path,callback){
        if(!this.routeTable[method]===undefined){
            throw new Error('${method} not be allowed');
        }
       this.routeTable[method][path]=callback;
    };
    this.get=function(path,callback){
        this.addPath('GET',path,callback);
    };
    this.post=function(path,callback){
        this.addPath('POST',path,callback);
    };
    this.put=function(path,callback){
        this.addPath('PUT',path,callback);
    } ;
    this.delete=function(path,callback){
        this.addPath('DELETE',path,callback);
    };
     this.options=function(path,callback){
        this.addPath('OPTIONS',path,callback);
    };
    this.findPath=function(mathod,path){
        if(this.routeTable[method]===undefined){
            return null;
        }
        if(this.routeTable[method][path]===undefined){
            return null;
        }
        return this.routeTable[method][path];
    };
};

var serv=http.createServer((req,res)=>{

    let urlobj=url.parse(req.url,true);
    let fcall=R.pathname(req.method,urlobj.pathname);
    if(R.findPath(req.method,urlobj.pathname)===null){
        res.statusCode=404;
        res.end('page not found');
        return;
    }
    let ctx={
        method:req.method,
        headers:req.headers,
        path:urlobj.pathname,
        body:'',
        url:urlobj,
        query:urlobj.query,
        request:req,
        response:res
    };
 
    var bodyData='';
    req.on('data',data=>{
        bodyData+=data.toString('utf8');
    });
    res.on('end',()=>{
         if(req.method=='POST'||req.method=='PUT'){
        let formType='application/x-www-form-urlencoded';
        if(req.headers['content-type']==formType){
            ctx.body=qs.parse(bodyData);
        }else{
            ctx.body=bodyData;
        }
    }
    reqcall(ctx);
    })
});


var R=new router();
R.get('/',(ctx)=>{
    ctx.response.end('ok');
});
R.post('/p',(ctx)=>{
    ctx.response.end('post');
});
R.put('/p',(ctx)=>{
    ctx.response.end(ctx.body);
})
R.get('/content',ctx=>{
  //获取资源
})
R.post('/content',ctx=>{
    //创建资源
})
R.delete('/content',ctx=>{
    //删除资源
})
R.put('/content',ctx=>{
    //更新资源
})
console.log(R.routeTable);

serv.listen(8001,'localhost')