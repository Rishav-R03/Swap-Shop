// Express for handling GET and POST request 
const express = require("express"); 
const app = express(); 
const fs = require("fs"); 
const path = require('path');
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "products"
});
// con.connect(function(error){
//     if(error) throw error;
//     console.log("connected !")

//     con.query("SELECT * FROM details ",function(error,result){
//         if(error) throw error;
//         console.log(result);//to get all rows
//         console.log(result[0]);//to get first node
//         console.log(result[0].product_name);//to get first product name
//         console.log(result[0].product_id);//to get first product id
//         console.log(result[0].product_price);//to get first product price
//     });

// });
// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res)=>{
    console.log(__dirname+"/public/index.html");
    const filePath = path.resolve(__dirname, 'index.html');
    res.sendFile(filePath);
})

app.get("/cart", (req, res)=>{
    console.log(__dirname+"/public/cart.html");
    res.sendFile(__dirname + "/public/cart.html");
})

app.get("/login", (req, res)=>{
    console.log(__dirname+"/public/login.html");
    res.sendFile(__dirname + "/public/login.html");
})

app.get("/shop", (req, res)=>{
    console.log(__dirname+"/public/shop.html");
    res.sendFile(__dirname + "/public/shop.html");
})

app.get("/contact", (req, res)=>{
    console.log(__dirname+"/public/contact.html");
    res.sendFile(__dirname + "/public/contact.html");
})

app.get("/login_google", (req, res)=>{
    console.log(__dirname+"/public/login_google.html");
    res.sendFile(__dirname + "/public/login_google.html");
})

app.get("/sellerpage", (req, res)=>{
    console.log(__dirname+"/public/sellerpage.html");
    res.sendFile(__dirname + "/public/sellerpage.html");
})
app.post('/sellerpage', function (req, res) {
    // console.log(req.body);
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Pwd = req.body.Pwd;
    var CPwd = req.body.CPwd;
    
    con.connect(function(error,result){
        if(error) throw error;
        var sql = "INSERT INTO login (Name, Email, Pwd, CPwd) VALUES (?, ?, ?, ?)";
        con.query(sql, [Name, Email, Pwd, CPwd], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error inserting user into the database.");
        }
        res.send("User Added Successfully: " + result.insertId);
        });
    
    });
    
});
app.get("/signup",function(req,res){
    console.log(__dirname+'/public/signup.html')
    res.sendFile(__dirname+'/public/signup.html');
})
app.post('/signup', function (req, res) {
    // console.log(req.body);
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Pwd = req.body.Pwd;
    var CPwd = req.body.CPwd;
    
    con.connect(function(error,result){
        if(error) throw error;
        var sql = "INSERT INTO login (Name, Email, Pwd, CPwd) VALUES (?, ?, ?, ?)";
        con.query(sql, [Name, Email, Pwd, CPwd], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error inserting user into the database.");
        }
        res.send("User Added Successfully: " + result.insertId);
        });
    
    });
    
});
app.get("/blog", (req, res)=>{
    console.log(__dirname+"/public/blog.html");
    res.sendFile(__dirname + "/public/blog.html");
})

app.get("/404", (req, res)=>{
    console.log(__dirname+"/public/404.html");
    res.sendFile(__dirname + "/public/404.html");
})

// Handle errors gracefully
function handleDatabaseError(res, err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred on the server." });
}

app.listen(8000,()=>{
    console.log('Server running at port 8000')
});
