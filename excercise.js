var express = require ("express");
var app = express();
var sql = require('mysql2')
const util = require('util');

var bodyparser = require('body-parser');
const res = require("express/lib/response");

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

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
  var query = util.promisify(con.query).bind(con);

  async function combo(call){


    // console.log("function")

     var s = "";
    
   // return "finished"

        s+=`<select name="${call.c_name}" id="${call.c_name}" >`

        for(var i=0;i<call.length; i++) { 
        //console.log(result.length)
        s+= ` <option value=" ${call[i].c_name} "> ${call[i].c_name} </option>`
            
    }
    
        s+=` </select>`

        return s;
 }


 async function combo1(arr){
  
  var gender = 1 ;
  var abc =[];
  var newarr = [];

  for(var j=0;j<arr.length;j++){

    var result = await query(`SELECT  combo.option_master.c_name ,combo.option_master.s_id
    FROM combo.select_master
    INNER JOIN combo.option_master ON combo.select_master.id = combo.option_master.c_id 
    where combo.option_master.s_id = '${[j+1]}';  `)//,function(err,result){
        
     // if(err) throw err;
     
   // console.log([j+1])
      
  
       newarr = await  combo(result);
  
         console.log("me")
      abc.push(newarr)
    


         console.log(abc)
       
    // })
   
     
   // abc.push
   
  }
 
     return abc;

 }




app.get('/8085', async(req, res)=>{

    // [1,2,3,4,5,6,7,8,9,10]
    var call = [];
    var arr = []

   var data = await query(`select id,nam from combo.select_master`)
   // if(err) throw err;
    console.log(data)

    arr=data
    console.log(arr[1].id)
    call = await combo1(data)
    res.render('excercise',{call})
  
  
  
 // console.log(call)

}).listen(8085)