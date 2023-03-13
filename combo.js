var express = require ("express");
var app = express();
var sql = require('mysql2')
const util = require('util');

var bodyparser = require('body-parser')

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
  const query = util.promisify(con.query).bind(con);

  async  function generate_master(arr){

    var s=""
      //var idname= store; 
    
      var result = await query(`SELECT  combo.option_master.c_name ,combo.option_master.s_id
    FROM combo.select_master
    INNER JOIN combo.option_master ON combo.select_master.id = combo.option_master.c_id 
    where combo.option_master.s_id = ${arr};  `)
        
       // var result2 = await query(``)
       //console.log(result)
    

       
       // var str =`<label for="${result.c_}">${}:</label><br>`
         s+=`<select name="${result.c_name}" id="${result.c_name}" >`

             for(var i=0;i<result.length; i++) { 
                //console.log(result.length)
              s+= ` <option value=" ${result[i].c_name} "> ${result[i].c_name} </option>`
                  
           }
            
       s+=` </select>`

      console.log(s)
        return s; 

       }
    



  
  app.get("/a",async (req,res)=>{

   var arr=[];

    var store = await query(`select id from combo.select_master`);
   
         //console.log(store)
       
          for(var i=0;i<store.length;i++) {
             
            arr[store[i].id] = await generate_master(store[i].id)

          }
    
    
          // var call = generate_master(store);
    
    
    
    
    res.render("combo",{arr})
 }).listen(8081);