var express = require("express");
var app = express();
//var session = require("express-session");
//var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var log = [];

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(session({
//     secret: "testSecret",//process.env.SES_SECRET,
//     resave: false,
//     saveUninitialized: true
// }));

app.use(function logIt(req, res, next) {
  //console.log("New incoming request!");
 var d = new Date();
 log.push( { ip:req.ip, path:req.path, time:d.toTimeString(), } );
 if(log.length>20){ log.shift(); } //limit log.length to 20
 next();
});

app.use("/css",express.static(__dirname+"/public/css"));
app.use("/js",express.static(__dirname+"/public/js"));
app.use("/html",express.static(__dirname+"/public/html"));
app.use("/public",express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
  res.sendFile("index.html",{root: "./public/html/" });
});

app.get("/log",(req,res)=>{
  res.json(log);
})

 app.listen(port, ()=>{
   console.log("App active on port: "+port);
 });
