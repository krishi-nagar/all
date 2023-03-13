var express = require ("express");
var app = express();
var sql = require('mysql2')
//var json = JSON.parse()
app.set('view engine', 'ejs');

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

app.get("/a",function (req,res){

    //var arr=[];
    var state;
    var relation;
    var language;
    var technologies;
    var gender;
    var department;

    con.query(`SELECT option_master.op_val as d
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = "6";`,(err,result)=>{

        if(err) throw err;
       // console.log("state",result.length)
        department = result;

    })

    con.query(`SELECT option_master.op_val as g
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = "1";`,(err,result)=>{

        if(err) throw err;
        console.log("gender",result.length)
        gender = result;

    })

    con.query(`SELECT option_master.op_val as t
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = "4";`,(err,result)=>{

        if(err) throw err;
        console.log("technologies",result.length)
        technologies = result;

    })

    con.query(`SELECT option_master.op_val as l
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = "3";`,(err,result)=>{

        if(err) throw err;
        console.log("language",result.length)
        language = result;

    })

    con.query(`SELECT option_master.op_val as s
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = "5";`,(err,result)=>{

        if(err) throw err;
       // console.log("state",result.length)
        state = result;

    })
    con.query(`SELECT option_master.op_val as r
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_s_id =select_master.s_id where select_master.s_id = 2; `,(err, result)=>{
        if (err) throw err;
        console.log(result.length);
        // console.log(result[0].op_val)
        // arr[0]=result[0].op_val
        // arr[1]=result[1].op_val
        // arr[2]=result[2].op_val
       
       // console.log("relation",result)

        relation=result;

       
       
    })
    setTimeout(()=>{console.log(department,technologies) 
        res.render("index",{data:relation,state,language,technologies,gender,department})},6000)
   
    //res.render("index",{data:result})
}).listen(9090);