const http = require('http'),
      qs   = require('qs'),
       url = require('url');

var routeTable ={
    '/':(req,res)=>{
        res.end('hey,This is home page');
    },
    '/help':(req,res)=>{
        res.end('there is no help');
    },
    '/submit':(req,res)=>{
        if(req.method!=='POST'){
            res.statusCode=405;
            res.end('method must be POST');
            return;
        }
    }
};
http.createServer((req,res)=>{
    let path = req.url.split('?')[0];
    if (routeTable[path] === undefined) {
        req.statusCode =404;
        return;
    }
    routeTable[path](req,res);
})
.listen(8080,'localhost');
const http = require('http');

var routeTable ={
    '/':(req,res)=>{

    },
    '/help':(req,res)=>{

    },
    '/user-login':(req,res)=>{
       if(req.method!=='POST')
       {
           res.end('failed');
           return;
       }
    }
};
http.createServer((req,res)=>{
    let path = req.url.split('?')[0];
    if (routeTable[path] === undefined) {
        req.statusCode =404;
        return;
    }
    let urlobj = url.parse(req.url,true);

    if(req.method == 'POST' 
        || req.method  == 'PUT'
        || req.method  == 'DELETE')
    {
        hasBody = true;
        req.on('data',data => {
            bodyData += data.toString('utf8');
        });
    }
    else{
        req.on('data',d => {})
    }

    req.on('end',()=>{
        let formType = 'application/x-www-form-urlencoded';
        if(hasBody && bodyData.length > 0
            && req.headers['content-type'] === formType){
                bodyData = qs.parse(bodyData);
            }
            routeTable[path](req,res);
    })
    
})
.listen(8080,'localhost');