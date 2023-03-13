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
  
 //--------------------------------page ------------------------------------------------------------------//

 app.get("/page",function (req,res){

    var first = req.query.first || '';
    var last = req.query.last || '';
    var designation = req.query.designation || '';
    var address1 = req.query.address1 || '';
   
    var address2 = req.query.address2 || '';
    var phone = req.query.phone || '';
    var city = req.query.city || ''; 
    var state = req.query.state || '';
    var zipcode = req.query.zipcode || '';
    var gender = req.query.gender || '';
    var relation = req.query.relation || '';
    var dob = req.query.dob || '';

   

    var que ="WHERE ";
    var add = "order by id ";

    //------------------------------------------pagination-----------------------------------------------//

    let no = req.query.no || 1;
    let limit = 100;
    let offset = (no-1)*limit ;
    var que1;
    var jk;
    var t_row;

  

    con.query(`select count(id) as count from form.test`,(err, result1)=>{
      if (err) throw err;
       jk=((Math.ceil(result1[0].count/limit)));
      //console.log(jk)
    })
    

    var coloumn = ["first","last","designation","address1","address2","phone","city","state","zipcode","gender","relation","dob"];
    const arr=[];
    var coloumn = ["first","last","designation","address1","address2","phone","city","state","zipcode","gender","relation","dob"];
    arr.push(first,last,designation,address1,address2,phone,city,state,zipcode,gender,relation,dob);
  
     for(var i=0;i<coloumn.length;i++){
      
        if ( arr[i] != ''){

            console.log(coloumn[i]);
            que += `${coloumn[i]} LIKE '%${arr[i]}%' AND `;
           
        }
        
      }
      add +=`  limit ${offset},${limit}`

      console.log(arr)
      //que = que.slice(0,que.length-6);
      // var del =` where del_val="1"`
      


      if (que.endsWith("WHERE ")){
        que=" where del_val ='0'";
       
      }
      console.log(que);
      var data;
      //SELECT * FROM studentDb.student_express  where first like '%a%' order by first  limit 0,20;
      //order by id limit ${offset},${limit};
      var sql=`SELECT * FROM form.test ${que} ${add} ` 


      console.log(sql)
    con.query(sql,(err,result)=>{
    //
     // if (err) throw err;
       // console.log(result);
        data=result;
       
    })
    
    

    setTimeout(()=>{console.log(sql) 
      res.render("form_pagination",{data:data,jk,no})},3000)
   
})

//-------------------------------------------------del--------------------------------------------//

app.get("/del",async(req,res)=>{
  
  var query = util.promisify(con.query).bind(con);
  var id = req.query.id;
  //var city;

// (async (req,res) => {
  console.log(id);
    var rows = await query(`update form.test set del_val='1' where id  = "${id}";`)

    console.log(rows);
    res.json(rows);
    //con.end();

    // var t_rows = await query(`select* from form.test where del_val="1";`)
    // console.log(t_rows);
    // res.json(t_rows);

    
 
})

//-------------------------------------------------listen-----------------------------------------//
app.listen(9000,(err)=>{
    console.log("server start...")
  })
 