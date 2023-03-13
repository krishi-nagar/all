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


app.get("/page",function (req, res){
    
    // var ks =[];
    // for(var i=0;i<data.length;i+10){
        let no= req.query.no || 1;
        let sort = req.query.sort || `id`;
        let order = req.query.order || `no`;
        if (order=="no")
        {
          order="asc";
        }
        let limit = 100;
        let offset = (no-1) * limit ;
        var data1 ;
        var jk;
        con.query(`select count(id) as count from studentDb.student_express`,(err, result1)=>{
          if (err) throw err;
           jk=((Math.ceil(result1[0].count/limit)));
          console.log(jk)
          
        con.query(` SELECT * FROM studentDb.student_express order by ${sort} ${order} limit ${offset},${limit}`,(err, result)=>{
       if (err) throw err;
       console.log(result.length);
       res.render("home1",{data:result,jk,sort,no,order})
       //res.send(result);
        //ks.push(result);
      }); 
    });
    //   res.render("index",{data:ks})
    //   console.log(ks);
    
       

    //}
}).listen(11111);

// app1.get("/",function (req, res){
    
//   // var ks =[];
//   // for(var i=0;i<data.length;i+10){
      
//       con.query(` SELECT * FROM studentDb.student_express order by id 
//       limit 20,10`,(err, result)=>{
//      if (err) throw err;
//      console.log("hi");
//      //res.send(result);
//       //ks.push(result);
//     res.render("index",{data:result})
//   //   res.render("index",{data:ks})
//   //   console.log(ks);
  
//      }); 

//   //}
// }).listen(9090);
