var express = require ('express');
const res = require('express/lib/response');
var app = express();
// var app1 = express();
var sql = require('mysql2')
// Set EJS as templating engine

app.set('view engine', 'ejs');
// app1.set('view engine', 'ejs');
console.log("ok")

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",

    
  });

  con.connect(function(err) {
    
    
    console.log(' connection created');
    //console.log(err)
   
  });

app.get("/",function(req,res){
     var ks=[];
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 0,10`,(err,result)=>{
        if(err)throw err;
       ks[0]=result;

    })
     
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 10,10`,(err,result)=>{
        if(err)throw err;
        ks[1]=result;

    })
    con.query(` SELECT * FROM studentDb.student_express order by id 
        limit 20,10`,(err,result)=>{
            if(err)throw err;
            ks[2]=result;

        })
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 30,10`,(err,result)=>{
        if(err)throw err;
        ks[3]=result;

    })
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 40,10`,(err,result)=>{
        if(err)throw err;
        ks[4]=result;
    })
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 50,10`,(err,result)=>{
        if(err)throw err;
        ks[5]=result;

    })

    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 60,10`,(err,result)=>{
        if(err)throw err;
        ks[6]=result;

    })
    con.query(` SELECT * FROM studentDb.student_express order by id 
    limit 70,10`,(err,result)=>{
        if(err)throw err;
        ks[7]=result;

    })
    setTimeout(()=>{console.log(ks) 
        res.render("index",{data:ks})},3000)

}).listen(8000);


