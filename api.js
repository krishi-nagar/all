const express = require('express');
//const { appendFile } = require('fs');
const sql = require('mysql2')
//console.log("all done")
var mysql = require('mysql2');
//const { listenerCount } = require('process');
var app = express();
app.use(express.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});


con.connect(function(err) {
    if (err) throw err;
    console.log('kj');
   // });
  });

app.get('/student/get',(req ,res)=>{
    
    con.query("SELECT * FROM studentDb.MOCK_DATA; ", function (err, result ) {
      if (err) throw err;
      console.log("hoi");
      res.send(result);
    }); 
})


// app.get('/bye/', (req, res)=> {
//     res.send('Bye page.')
//  })
 app.listen(8080);

//  app.post('/student/post',(req ,res)=>{
//      con.query(`insert into studentDb.STUDENT_M1(First_Name,Last_Name,Contact,Email,College_id) values('himanshu','roy','785463210','fdsa@gmail.com','261');`,(err, result)=>{
//               if (err) throw err;
//               console.log("hi");
//               res.send(result);
//             }); 
 
 //   })