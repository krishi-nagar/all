const express = require('express');
const mysql = require('mysql2');
var app = express();
app.use(express.json());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",

    
  });

con.connect(function(err) {
    if (err)
    //var sql = "CREATE TABLE demo_express (first VARCHAR(255), last VARCHAR(255) , email VARCHAR(255) , coll VARCHAR(255) , number VARCHAR(255) )";
    //var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    console.log(' connection created');
    //console.log(err)
   // });
  });




// var f_name = ["sandhya","tani","dev","kashyap","aadi","sam","prachi","seema","kinjal","shub","teju","sunny"];
// var l_name = ["kanaujia","pal","pastagia","sonawala","sharma","patel","singh","desai","kinjal","gupta","verma","gor"];
// var college = ["GCETbhavnagar","VNSGU","IIM","IIT kanpur","LD","GDCST","nirma","parul","indus"]
// var city1 = ["surat","vadodara","anand","ahmedabad","Lucknow","dwarika","kanpur","mumbai","delhi"];


// var number = Math.floor(Math.random()*(999999999-10000000000+1)+10000000000)
// var first = f_name[Math.random()*f_name.length]
// var last = l_name[Math.random()*l_name.length]
// var email =` ${f_name}-${college}+@gamil.com`
// var coll = college[Math.random()*college.length]  




 app.get('/stu/post',(req ,res)=>{

    var f_name = ["sandhya","tani","dev","kashyap","aadi","sam","prachi","seema","kinjal","shub","teju","sunny"];
    var l_name = ["kanaujia","pal","pastagia","sonawala","sharma","patel","singh","desai","kinjal","gupta","verma","gor"];
    var college = ["GCETbhavnagar","VNSGU","IIM","IIT kanpur","LD","GDCST","nirma","parul","indus"]
    var city1 = ["surat","vadodara","anand","ahmedabad","Lucknow","dwarika","kanpur","mumbai","delhi"];
    var y=[2004,2001,2003,2005,2006,2007,2008,2009,2013,2016];
    var m=[1,2,3,4,5,6,7,8,9,10,11,12];
    var d=[1,2,3,4,5,6,7,8,9,11,22,12,13,14,15,16,17];

    for (var i=0;i< 1000;i++)
    {
        var num = Math.floor(Math.random()*(999999999-10000000000+1)+10000000000);
        var first = f_name[parseInt(Math.random()*f_name.length)];
        var last = l_name[parseInt(Math.random()*l_name.length)];
        var city = city1[parseInt(Math.random()*city1.length)];
        var coll = college[parseInt(Math.random()*college.length)];  
        var email =` ${first}${city}@gmail.com`;
        var dob = d[Math.floor(Math.random()*d.length)]+"-"+m[Math.floor(Math.random()*m.length)]+"-"+y[Math.floor(Math.random()*y.length)]

        con.query(`insert into studentDb.student_tab(first,last,email,coll,num,dob) values('${first}','${last}','${email}','${coll}','${num}','${dob}');`,(err, result)=>{
        if (err) throw err;
        console.log("hi");
        //res.send(result);
        }); 
    }

    
     
 
}).listen(8082);