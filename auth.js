var express = require ("express");
var app = express();
var sql = require('mysql2')
const util = require('util');
//const query = util.promisify(con.query).bind(con);
var bodyparser = require('body-parser');
const { query } = require("express");

//to store thevalue in cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());


//for json token
var jwt = require('jsonwebtoken');



app.use(express.static('assets'))

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

app.get('/auth',async(req,res)=>{
     console.log(' rendering auth')
    res.render("auth")
})
app.get('/email-val',async(req,res)=>{

   var email = req.body.email;

   var query = util.promisify(con.query).bind(con);

   var result = await query(`select email from form.registration `)

   res.json(result);
   console.log(result);


})
app.post('/p-auth',async(req,res)=>{

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    //--------------bcryptjs to encrypt password---------------//
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(1);
    var hash = bcrypt.hashSync(`${password}`, salt);




    var query = util.promisify(con.query).bind(con);

    var result = await query(`INSERT INTO form.registration ( uname, email, password , active) 
    VALUES ( '${name}', '${email}', '${hash}' ,'0');`)

    var token = jwt.sign({result}, "aaaaaaa");
            res.cookie('jwttoken',token);
            

            console.log(token);


    console.log(result)
    res.render('activation');
})

app.post('/post-p-login',async(req,res)=>{

    var query = util.promisify(con.query).bind(con);

    var email = req.body.email;
    var password = req.body.password;

    console.log(req.body)

    var result = await query(`select * from form.registration where email='${email}';`)

    console.log(result)

    //--------------bcryptjs to encrypt password---------------//
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(1);
    var hash = bcrypt.hashSync(`${password}`, salt);



    if(result.length==0){

      alert("User not found!!")
    }
    else {
    
       //bcrypt.compareSync(oldPassword, user.password)
    var match = bcrypt.compareSync(`${password}`, `${result[0].password}`)

    console.log(match)

        if(match == true){
            
            var token = jwt.sign({result}, "aaaaaaa");
            res.cookie('jwttoken',token);
            

            console.log(token);
           // res.render('home')
            res.redirect('http://localhost:12121/cookies')
             
             
            
        } else {
           
           
            console.log({ message: 'passwords do not match'});
        }
      ;
      
    }

   

})

app.get('/get-p-login',async(req,res)=>{

  var val = req.cookies.jwttoken;
  
  if(val){
    
    var verify = jwt.verify(val,'aaaaaaa');
    console.log("varify",verify)
    res.render('a-home',{name:verify.result[0].uname})

  }

  else{
    res.render('login')
  }

})

app.get('/activate',async(req,res)=>{


  var val = req.cookies.jwttoken;
  var verify = jwt.verify(val,'aaaaaaa');
  //console.log("varify",verify)


  //console.log(verify.result.insertId)
 
  
  var query = util.promisify(con.query).bind(con);

  var result = await query(`update  form.registration
  SET active = '0'
  WHERE id = '${verify.result.insertId}'; `)

  
 res.render('login')

});
app.get('/cookies',async(req,res)=>{

    var val = req.cookies.jwttoken;

   // console.log(val)

    if (val){
        var verify = jwt.verify(val,'aaaaaaa');

        console.log("varify-----------------------------------------------------",verify) 
    };

    //let decodedToken = jwt.decode(token, { complete: true });

    //console.log("here--------------",verify.result[0].uname)
    res.render('a-home',{name:verify.result[0].uname})
   // res.render('a-home')

})

app.get('/logout',async(req,res)=>{

    res.clearCookie("jwttoken");
    res.render('login')
})


//-------------------------------------------------listen-----------------------------------------//
app.listen(9779,(err)=>{
    console.log("server start...")
  })
  