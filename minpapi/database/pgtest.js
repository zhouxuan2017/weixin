const pg=require('pg');

// var pdb=new pg.POOL({
var pdb=new pg.Client({
    host:'127.0.0.1',
    port:5432,
    user:'zhouxuan',
    database:'zhouxuan',
    password:'czwhcloud1234+'
});
pdb.on('error',err=>{
    console.log(err);
    process.exit(1);
})
pdb.connect();

;(async()=>{
    let sql='INSERT INTO users(username,passwd)' +'VALUES ($1,$2)';
    let retdata=await pdb.query(sql,[
        `u${Date.now()}`,`123456`
    ])
    console.log(retdata);
    pdb.end;
})();
