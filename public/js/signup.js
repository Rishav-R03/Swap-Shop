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

app.get("/signup", (req, res)=>{
    const filePath = path.resolve('signup.html');
    res.sendFile(filePath);
});

// authenticte with database
app.post('/signup',encoder, (req, res) => {
  const username = req.body.username;
  const useremail = req.body.useremail;
  const password = req.body.password;

  db.query("INSERT INTO userdata SET ?",{username,useremail,password}, (err, result) => {
    if (err) {
      res.redirect("/signup");
    } else {
      res.redirect("/index");
    }
  });
});

//when login is successfull
app.get("/index",function(req,res){
    const filePath1 = path.resolve('index.html');
    res.sendFile(filePath1);
});

app.listen(8000);