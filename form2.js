var express = require ("express");
var app = express();
var sql = require('mysql2')
const util = require('util');
//const query = util.promisify(con.query).bind(con);
var bodyparser = require('body-parser');
const { query } = require("express");

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

//-----------------------------------------select box edit ----------------------------------------//


async  function generate_master(id,selectedval=""){
  const query = util.promisify(con.query).bind(con);
  var s=""
    //var idname= store; 
  
    var result = await query(`SELECT option_value  FROM form.option_master inner join form.select_master 
    on option_master.fk_select_master_id=select_master.select_master_id where select_master_id= "${id}"; `)
      
    // var result2 = await query(``)
    //console.log(result)
  
  
    
    // var str =`<label for="${result.c_}">${}:</label><br>`
      s+=`<select name="${"dropdo"+id}" id="${result.option_value}" >`

          for(var i=0;i<result.length; i++) { 

            if (result[i].option_value == selectedval){

              s+=`<option value= "${result[i].option_value}" selected>  ${result[i].option_value} </option>`
            }
              
            //console.log(result.length)
            
            else {
            s+= ` <option value=" ${result[i].option_value} "> ${result[i].option_value} </option>`
            }

        }
          
    s+=` </select>`

    console.log(s)
      return s; 

}


app.get("/a",function (req,res){

    //var arr=[];
    var state;
    var relation;
    var language;
    var technologies;
    var gender;
    var department;
   var state;

    

    con.query(`SELECT option_master.option_value as d
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "6";`,(err,result)=>{

        if(err) throw err;
       // console.log("state",result.length)
        department = result;

    })

    con.query(`SELECT option_master.option_value as g
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "7";`,(err,result)=>{

        if(err) throw err;
        console.log("gender",result.length)
        gender = result;

    })

    con.query(`SELECT option_master.option_value as t
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "9";`,(err,result)=>{

        if(err) throw err;
        //console.log("technologies",result.length)
        technologies = result;

    })

    con.query(`SELECT option_master.option_value as l
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "10";`,(err,result)=>{

        if(err) throw err;
        console.log("language",result.length)
        language = result;

    })

  
    con.query(`SELECT option_master.option_value as s
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "1";;`,(err,result)=>{

        if(err) throw err;
       // console.log("state",result.length)
        state = result;

    })

   
    
    con.query(`SELECT option_master.option_value as r
    FROM form.option_master 
    INNER JOIN form.select_master
    ON   option_master.fk_select_master_id = select_master.select_master_id where select_master.select_master_id = "2"; `,(err, result)=>{
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
        res.render("form2",{data:relation,state,language,technologies,gender,department})},1000)
   
    //res.render("index",{data:result})
})

//-----------------city---------------------//

app.get("/cit",async(req,res)=>{
  
  const query = util.promisify(con.query).bind(con);
  var statename = req.query.statename;
  var city;

// (async (req,res) => {
  console.log(statename);
    var rows = await query(`SELECT option_master_city.nam as ci
    FROM form.option_master_city 
    INNER JOIN form.option_master
    ON   option_master_city.state_id =option_master.option_master_id where option_value =  "${statename}";`)
    console.log(rows);
    res.json(rows);
    //con.end();
    
 
})
 
 
 


  app.post("/post",function(req,res){

    //----------------------------------------BASIC-----------------------------------------------------//

    var fname = req.body.fname;
    var lname = req.body.lname;
    var designaion = req.body.designaion;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var phonenumber = req.body.phonenumber;
    var city = req.body.city;
    var state =  req.body.state;
    var email = req.body.email; 
    var zipcode =  req.body.zipcode;
    var gender = req.body.gender;
    var relationshipstatus = req.body.relationshipstatus;
    var dob =  req.body.dob;

    var lastinsertedid ;

   // await new Promise ((resolve,rejects)=>{

        con.query(`INSERT INTO form.test (firt, lat, designation, address1, address2,
             phone, city, state,email, zipcode, gender, relation, dob) 
        VALUES ('${fname}', '${lname}', '${designaion}', '${address1}', '${address2}',
         '${phonenumber}', '${city}', '${state}', '${email}','${zipcode}', '${gender}', '${relationshipstatus}', '${dob}');
   
        `,(err,result)=>{
   
       console.log(result.insertId)
        lastinsertedid = result.insertId

          //  });
    
    
    
   // .then((data))
   
//   -------------------------------city----------------------------//

// (async () => {
//   const response = await fetch('https://quotes.toscrape.com/random');
//   const body = await response.text();
//   console.log(body);
// })();


//----------------------education details-------------------------------------------//

        var passingyear = req.body.passingyear;
        var board = req.body.board;
        var percentage = req.body.percentage;


        console.log("education start");
       
       // await new Promise ((resolve,rejects)=>{


        con.query(`INSERT INTO form.t_education (nameboard, passingyear, percentage, t_id)
        VALUES ('${board}', '${passingyear}', '${percentage}', '${lastinsertedid}');
        `,(err,result)=>{

            //${lastinsertedid}

            //console.log(result.insertId)
            //lastinsertedid = result.insertId
            // console.log(req.body)
               
            // console.log("Using Body-parser: ", req.body.email)
        
            console.log("education")
            console.log(board)
                //res.send()
                //res.render('form2', {result,state,gender,relationshipstatus });
            }); 
 
       // });
        console.log("hello")
 //----------------------------languages-----------------------------------------//

    //  var lang = req.body.lang;
    //     var speak =  req.body.speak;
    //     var write = req.body.write;
    //     var read = req .body.read;

    
    for(var i=0;i<req.body.lang.length;i++)
    {
    //await new Promise((resolve,rejects)=>{

    con.query( `INSERT INTO form.t_lang (l_name, spek, writ, reade, t_id) 
    value(

    '${req.body.lang[i]}',
    '${req.body.read?(req.body.read.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${req.body.write?(req.body.write.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${req.body.speak?(req.body.speak.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${lastinsertedid}');`
    ,(err,result)=>{
    if(err) throw err;
    //resolve(result)
    })
    }
    //).then((data)=>{console.log("data insert into expriences")})

    //}

//-----------------------work experience----------------------------------------------------//


   var companyname =  req.body.companyname;
   var designaion =  req.body.designaion;
   var dob1 =  req.body.dob1;
   var dob2 =  req.body.dob2;
  
  // await new Promise ((resolve,rejects)=>{

        con.query(`INSERT INTO form.t_work (comp_name, designaton, dfrom, dto, t_id) VALUES 
        ('${companyname}', '${designaion}', '${dob1}', '${dob2}', '${lastinsertedid}');
        `,(err,result2)=>{

            
            // console.log(req.body)

            
            console.log("work")
               
            }) 
       // })



//-----------------------------technologies----------------------------------------//

   var technologies = req.body.technologies;
  var level;
//    var mediator = req.body.mediator ;
//    var expert = req.body.expert ;


  //await new Promise ((resolve,rejects)=>{

        for( var i = 0 ; i<technologies.length ; i++){
            //eval("req.body."+req.body.technologies[i])
             level  = eval("req.body."+req.body.technologies[i]);
           // console.log(technologies.length)
            con.query(` INSERT INTO form.t_techno (name, level, t_id)
            VALUES ('${technologies[i]}', '${level}',  '${lastinsertedid}');
            `,(err,result2)=>{
                if(err) console.error(err)
            
                console.log("techno")
                    //res.send()
                    //res.render('form2', {result,state,gender,relationshipstatus });
                }) 
        
        }
    
  //  })

//-----------------------------refrence contact---------------------------------------------------------//

var namer = req.body.namer;
var contactnumber = req.body.contactnumber;
var relation = req.body.relation;

   //await new Promise ((resolve,rejects)=>{

    con.query(`INSERT INTO form.t_refrence (name, contact, relation, t_id)
    VALUES ('${namer}', '${contactnumber}', '${relation}', '${lastinsertedid}');
    `,(err,result2)=>{

            
            // console.log(req.body)

            // console.log("Using Body-parser: ", req.body.email)
        
            console.log("refrences")
                //res.send()
                //res.render('form2', {result,state,gender,relationshipstatus });
            }) 
        
        
       // })
//--------------------------prefrences-----------------------------------------//

var preferedlocaton = req.body.preferedlocaton;
var noticeperiod = req.body.noticeperiod;
var currentctc = req.body.currentctc;
var expectedctc = req.body.expectedctc;
var department = req.body.department;

 //await new Promise ((resolve,rejects)=>{

    con.query(`INSERT INTO form.t_prefrences (preferedlocaton, noticeperiod, currentctc,expectedctc, department, t_id) VALUES 
    ('${preferedlocaton}', '${noticeperiod}', '${currentctc}','${expectedctc}','${department}', '${lastinsertedid}');
    `,(err,result2)=>{

        //INSERT INTO form.t_prefrences (preferedlocaton, noticeperiod, currentctc, department, t_id) VALUES ('zcd', 'ghng', 'gh', 'ghj', ''${lastinsertedid}'');
   
            console.log(req.body)

            // console.log("Using Body-parser: ", req.body.email)
        
            console.log("prefrence")
                //res.send()
                //res.render('form2', {result,state,gender,relationshipstatus });
            })
        
       // })

 
  });
        
  });

  //--------------------------------page ------------------------------------------------------------------//

app.get("/page",function (req,res){

   
  var firt = req.query.firt || '';
  var lat = req.query.lat || '';
  var designation = req.query.designation || '';
  var address1 = req.query.address1 || '';
 
  var address2 = req.query.address2 || '';
  var phone = req.query.phone || '';
  var city = req.query.city || ''; 
  var state = req.query.state || '';
  var email = req.query.email || '';
  var zipcode = req.query.zipcode || '';
  var gender = req.query.gender || '';
  var relation = req.query.relation || '';
  var dob = req.query.dob || '';

 

  var que ="WHERE ";
  var ad = "order by id ";

  //------------------------------------------pagination-----------------------------------------------//

  let no = req.query.no || 1;
  let limit = 2;
  let offset = (no-1)*limit ;
  //var que1;
  var jk;
  var t_row;
  var Ajax = req.query.Ajax || false;


  con.query(`select count(id) as count from form.test`,(err, result1)=>{
    if (err) throw err;
     jk=((Math.ceil(result1[0].count/limit)));
    //console.log(jk)
  })
  

  var coloumn = ["firt","lat","designation","address1","address2","phone","city","state","email","zipcode","gender","relation","dob"];
  const arr=[];
  var coloumn = ["firt","lat","designation","address1","address2","phone","city","state","email","zipcode","gender","relation","dob"];
  arr.push(firt,lat,designation,address1,address2,phone,city,state,email,zipcode,gender,relation,dob);

   for(var i=0;i<coloumn.length;i++){
    
      if ( arr[i] != ''){

          console.log(coloumn[i]);
          que += `${coloumn[i]} LIKE '%${arr[i]}%' AND `;
        console.log(que) 
      }
      
    }
    ad +=`  limit ${offset},${limit}`

    console.log(arr)
    //que = que.slice(0,que.length-6);
    // var del =` where del_val="1"`
    
    if(que.endsWith("AND ")){
      que +=" del_val='0'";
    }

    else if (que.endsWith("WHERE ")){
    que +="  del_val ='0'";
       //que="";
    }
    console.log(que);
    var data;
    //SELECT * FROM studentDb.student_express  where firt like '%a%' order by firt  limit 0,20;
    //order by id limit ${offset},${limit};
    var sql=`SELECT * FROM form.test ${que} ${ad} ` 


    console.log(sql)
  con.query(sql,(err,result)=>{
  //
   // if (err) throw err;
     // console.log(result);
      data=result;
     
  })
   
  
  

  setTimeout(()=>{console.log(sql) 
    if(!Ajax){  console.log(data)
      res.render("form3",{data:data,jk,no})
    }
    else{
      res.json(data)
    }
    },3000)
 
})
   


//--------------------------------searching------------------------------------------------------//
// app.get("/search",function (req,res){

//   var firt = req.query.fname || '';
//   var lat = req.query.lname || '';
//   var designation = req.query.designation || '';
//   var address1 = req.query.address1 || '';
 
//   var address2 = req.query.address2 || '';
//   var phone = req.query.phone || '';
//   var city = req.query.city || ''; 
//   var state = req.query.state || '';
//   var email = req.query.email || '';
//   var zipcode = req.query.zipcode || '';
//   var gender = req.query.gender || '';
//   var relation = req.query.relation || '';
//   var dob = req.query.dob || '';

 

//   var que ="WHERE ";
//   var add = "order by id ";

// let no = req.query.no || 1;
// let limit = 2;
// let offset = (no-1)*limit ;
// //var que1;
// var jk;
// var t_row;
// //var Ajax = req.query.Ajax || false;


// con.query(`select count(id) as count from form.test`,(err, result1)=>{
//   if (err) throw err;
//    jk=((Math.ceil(result1[0].count/limit)));
//   //console.log(jk)
// })


// var coloumn = ["firt","lat","designation","address1","address2","phone","city","state","email","zipcode","gender","relation","dob"];
// const arr=[];
// var coloumn = ["firt","lat","designation","address1","address2","phone","city","state","email","zipcode","gender","relation","dob"];
// arr.push(firt,lat,designation,address1,address2,phone,city,state,email,zipcode,gender,relation,dob);

//  for(var i=0;i<coloumn.length;i++){
  
//     if ( arr[i] != ''){

//         console.log(coloumn[i]);
//         que += `${coloumn[i]} LIKE '%${arr[i]}%' AND `;
       
//     }
    
//   }
//   add +=`  limit ${offset},${limit}`

//   console.log(arr)
//   //que = que.slice(0,que.length-6);
//   // var del =` where del_val="1"`
  
//   if(que.endsWith("AND ")){
//    // que="where del_val='0'";
//    que = "";
//   }

//   else if (que.endsWith("WHERE ")){
//   //que=" where del_val ='0'";
//      que="";
//   }
//   console.log(que);
//   var data;
//   //SELECT * FROM studentDb.student_express  where firt like '%a%' order by firt  limit 0,20;
//   //order by id limit ${offset},${limit};
//   var sql=`SELECT * FROM form.test ${que} ${add} ` 


//   console.log(sql)
// con.query(sql,(err,result)=>{
// //
//  // if (err) throw err;
//    // console.log(result);
//     data=result;
   
// })
 



// setTimeout(()=>{console.log(sql) 
 
//     res.render("form4",{data:data,jk,no})
  
 
//   },3000)

// })

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
//------------------------------------------------view--------------------------------------------//
app.get("/view",async(req,res)=>{
      
  var query = util.promisify(con.query).bind(con);
  var id = req.query.e_id;

  var table= await query(`select * from form.t_education where t_id = "${id}";`)
  console.log(table);
  res.render("view",{data1:table});
})

//------------------------------------------edit-------------------------------------------------//

app.get("/edit",async(req,res)=>{ 
  var query = util.promisify(con.query).bind(con);
  var id = req.query.id;

   var basic = await query(`select * from form.test where id = "${id}";`)
  //console.log(basic[0]);
   var education = await query (`select * from form.t_education where t_id = "${id}";`) ;
   //console.log(education);
   var work = await query (`select * from form.t_work where t_id = "${id}";`);
   //console.log(education);
   var prefrences = await query (`SELECT * FROM form.t_prefrences where t_id = "${id}";`); 
   //console.log(prefrences);
   var refrence = await query (`select * from form.t_refrence where t_id = "${id}";`);
   //console.log(refrence); 
   var language = await query (`select * from form.t_lang where t_id ="${id}";`);
  //console.log(language);
  var technologies = await query (`select * from form.t_techno where t_id ="${id}";`);
  //console.log (technologies); 

    //--for dropdown select button calling function----------------------------------------------------------//
    var state = await generate_master("1",basic[0].state)
    var gender = await generate_master("7",basic[0].gender)
    var city = await generate_master("8",basic[0].city)
    var relationship = await generate_master ("2",basic[0].relation)

     var preferedlocaton = await generate_master("4",prefrences[0].preferedlocaton)
     var department = await generate_master("6",prefrences[0].department)

  res.render("edit",
  { basic,
    gender,state,city , relationship,
    education,work,
    prefrences,
    preferedlocaton,department,
    refrence,
   language,
  technologies});
})

//--------------------------------------update-------------------------------------------------//

app.post("/update",async (req,res)=>{

  var query = util.promisify(con.query).bind(con);
  var id = req.body.id;
   console.log(req.body)

   //-basic------
    var firt = req.body.fname || '';
    var lat = req.body.lname || '';
    var designation = req.body.designaion || '';
    var address1 = req.body.address1 || '';
   
    var address2 = req.body.address2 || '';
    var phone = req.body.phonenumber || '';
    var city = req.body.dropdo8 || ''; 
    var state = req.body.dropdo1 || '';
    var email = req.body.email || '';
    var zipcode = req.body.zipcode || '';
    var gender = req.body.dropdo7 || '';
    var relation = req.body.dropdo2 || '';
    var dob = req.body.dob || '';


  var basic = await query(`UPDATE form.test
  SET firt = '${firt}', lat = '${lat}', designation = '${designation}' ,address1 = '${address1}', address2 = '${address2}', phone = '${phone}' , city = '${city}' , state = '${state}',
  email = '${email}' , zipcode = '${zipcode}' ,gender = '${gender}' , relation = '${relation}' , dob = '${dob}'  
  WHERE id = ${id};`)

  //------education----
   var board = req.body.board ;
   var passingyear = req.body.passingyear ;
   var percentage = req.body.percentage ;

   var education1 = await query(`delete from form.t_education where t_id = "${id}"`)

  var education = await query(`INSERT INTO form.t_education (nameboard, passingyear, percentage, t_id)
        VALUES ('${board}', '${passingyear}', '${percentage}', '${id}');`);

  // //----work --------

  var companyname = req.body.companyname ;
  var designaion = req.body.designaion ;
  var dob1 = req.body.dob1 ;
  var dob2 = req.body.dob2 ;
  
  var work1 = await query(`delete from form.t_work where t_id = "${id}"`)
  
  var work = await query (`INSERT INTO form.t_work (comp_name, designaton, dfrom, dto, t_id) VALUES 
  ('${companyname}', '${designaion}', '${dob1}', '${dob2}', '${id}');`);



 //--------------language------------

 var lang = req.body.lang;
 var speak = req.body.speak;
 var write = req.body.write ;
 var read = req.body.read ;

 for(var i=0;i<req.body.lang.length;i++)

    {
              console.log(req.body.lang.length)
 var language = await query (`delete from form.t_lang where t_id = "${id}" `)

    }



 for(var i=0;i<req.body.lang.length;i++)
    {
    //await new Promise((resolve,rejects)=>{

    var language1 = await query( `INSERT INTO form.t_lang (l_name, spek, writ, reade, t_id) 
    value(

    '${req.body.lang[i]}',
    '${req.body.read?(req.body.read.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${req.body.write?(req.body.write.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${req.body.speak?(req.body.speak.includes(req.body.lang[i])?'yes':'no'):'no'}',
    '${id}');`
    )
    }

  //-----technologies---------------

  var technologies = req.body.technologies;
  var level;

 // var technologies = await query (`delete from form.t_techno where t_id = "${id}"`);

  for( var i = 0 ; i<technologies.length ; i++){
    //eval("req.body."+req.body.technologies[i])
     level  = eval("req.body."+req.body.technologies[i]);
    console.log(technologies.length)
    var technologies1 = await query(` INSERT INTO form.t_techno ( name, level, t_id) 

    VALUES ('${technologies[i]}', '${level}',  '${id}');`)
     

  }
  
  
  //-----refrence---------------

  var namer = req.body.namer ;
  var contactnumber = req.body.contactnumber ;
  var relation = req.body.relation ;

  var refrence = await query (`delete from form.t_refrence where t_id = "${id}"`);

  var refrence1 = await query (`INSERT INTO form.t_refrence (name, contact, relation, t_id)
  VALUES ('${namer}', '${contactnumber}', '${relation}', '${id}');
  `)

  //-----prefrences---------------
  
 
  var preferedlocaton = req.body.dropdo4;
  var noticeperiod = req.body.noticeperiod;
  var currentctc = req.body.currentctc;
  var expectedctc = req.body.expectedctc;
  var department = req.body.dropdo6;

  var prefrences = await query (`delete from form.t_prefrences where t_id = "${id}"`);

  var prefrences1 = await query (`INSERT INTO form.t_prefrences (preferedlocaton, noticeperiod, currentctc,expectedctc, department, t_id) VALUES 
  ('${preferedlocaton}', '${noticeperiod}', '${currentctc}','${expectedctc}','${department}', '${ id}');
  `)


//   console.log(refrence);
  console.log("donee")
 })


 app.post('/finish',async (req, res) => {

    res.render('finish')

 })
//-------------------------------------------------listen-----------------------------------------//
app.listen(8089,(err)=>{
    console.log("server start...")
  })
  