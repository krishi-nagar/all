//to read file

//  const { fstat } = require('fs');
// var http = require('http');
// var fs = require('fs');

// // const { type } = require('os');
// http.createServer (function(req, res)
// {
//     fs.readFile('demo.txt',function (err,data)
//     {
//         res.writeHead(200,{'content-type' : 'text/html'});
//         res.write(data);
//         return res.end();
//     });
// }).listen(8080);

//to write the file




//to open file
// var fs = require('fs');

// fs.open('demo.txt', 'r', function (err, file) {
//   if (err) throw err;
//   console.log('done!');
// });
       

//replace the file
var fs = require('fs');

fs.writeFile('demo.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
}); 


//to delete file

var fs = require('fs');

fs.unlink('delete.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});


//to rename file

var fs = require('fs');

fs.rename('delete.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});

//to use split string functions

fs.readFile('demo.txt','utf8',(err,data)=>{
    if (err) throw err;
    var result = data.split("")
    console.log(result)
})

console.log("hi");
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date(2023,01,26+05);
let day = weekday[d.getDay()];
console.log(day)


//leap year
  
function checkLeapYear(year) {

    //three conditions to find out the leap year
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        console.log(year + ' is a leap year');
    } else {
        console.log(year + ' is not a leap year');
    }
}

// take input
const year = 2023 // prompt('Enter a year:');

checkLeapYear(year);

number=33;

if(number==1)
{
    console.log("its not prime number")
}
else 
{
    for (i=2;i<number;i++)
    {
        if(0==number%i)
        {
            var itsprime = number ;
            break;
        }
         
        else
        {
            var itsnotprime = number ;
            break;
        }
    }
    console.log(`${itsprime}+${itsnotprime}`)
}

