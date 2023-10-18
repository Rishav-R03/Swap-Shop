const mysql = require("mysql2");
const express = require("express"); 
const app = express();
const path = require('path');
const bodyparser=require("body-parser");
const encoder= bodyparser.urlencoded();

//for css
app.use('/css',express.static("css"));

//making connection with sql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "452015",
    database: "login"
});

//connecting to database
db.connect(function(error){
    if(error) throw error;
    else console.log("connected to database successfully");
});

app.get("/login.html", (req, res)=>{
    const filePath = path.resolve('login.html');
    res.sendFile(filePath);
});


// authenticte with database
app.post("/login.html",encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    db.query("select * from userdata where user_name = ?  && user_pass = ? ",[username,password],function(error,results,fields){
   if(results.length > 0){
            res.redirect("/index");
        }
        else{
            res.redirect("/login.html");
        }
        res.end;
    })
});  

//when login is successfull
app.get("/index",function(req,res){
    const filePath1 = path.resolve('index.html');
    res.sendFile(filePath1);
});

app.listen(8000);
