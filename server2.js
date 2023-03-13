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

// app.get('/a',(req,res)=>{
//   res.write("hello")
//   res.end();
// })

  app.get("/page",function (req, res){



    
    var first = req.query.first || '';
    var last = req.query.last || '';
    var email = req.query.email || '';
    var coll = req.query.coll || '';
    var number = req.query.number || '';
    
    var que ="WHERE ";
    var add = "order by id ";

    //-------pagination--------------------//

    let no = req.query.no || 1;
    let limit = 100;
    let offset = (no-1)*limit ;
    var que1;
    var jk;

   

    con.query(`select count(id) as count from studentDb.student_express`,(err, result1)=>{
      if (err) throw err;
       jk=((Math.ceil(result1[0].count/limit)));
      //console.log(jk)
    })
    // con.query(`SELECT *FROM studentDb.student_express  `,(err,result)=>{
    //   if (err) throw err;
    //     que1=result;
    //   console.log(que1);
    // })
    var coloumn = ["first","last","email","coll","number"];
    const arr=[];
    arr.push(first,last,email,coll,number);
  
     for(var i=0;i<coloumn.length;i++){
      
        if ( arr[i] != ''){

            console.log(coloumn[i]);
            que += `${coloumn[i]} LIKE '%${arr[i]}%' AND `;
           
        }
        
      }
      add +=`  limit ${offset},${limit}`

      console.log(arr)
      que = que.slice(0,que.length-5);
      
      
      if (que.endsWith("WHERE ")){
        que="";
      }
      console.log(que);
      var data;
      //SELECT * FROM studentDb.student_express  where first like '%a%' order by first  limit 0,20;
      //order by id limit ${offset},${limit};
      var sql=`SELECT * FROM studentDb.student_express ${que} ${add}  ` 

      console.log(sql)
    con.query(sql,(err,result)=>{
    //
     // if (err) throw err;
       // console.log(result);
        data=result;
       
    })
    setTimeout(()=>{console.log(sql) 
      res.render("home2",{data:data,jk,no})},3000)
   
    
})
app.listen(9090,(err)=>{
  console.log("server start...")
})
