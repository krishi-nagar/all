var express = require ("express");
var app = express();

//var {auth} = require('../middleware/auth');
app.use(auth);

//for json token
var jwt = require('jsonwebtoken');

function auth(req, res, next) { 

    console.log("hello")
    try{
          
        var val = req.cookies.jwttoken;
        var verify = jwt.verify(val,'aaaaaaa');
        console.log("varify",verify)
        //res.render('a-home',{name:verify.result[0].uname})

  }
   catch{
       
       console.log("home") 
       res.redirect('http://localhost:12121/get-p-login')

    }
}

app.listen(8085);