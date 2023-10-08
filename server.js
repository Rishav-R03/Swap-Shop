// Requiring in-built https for creating 
// https server 
const https = require("https"); 
  
// Express for handling GET and POST request 
const express = require("express"); 
const app = express(); 

// Requiring file system to use local files 
const fs = require("fs"); 
const path = require('path');

const port = 8000;

// Configuring express to use body-parser 
// as middle-ware 
const mime = require('mime');
// Serve static files (e.g., HTML, CSS, JavaScript) from a directory
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.get("/signup", (req, res)=>{
    console.log(__dirname+"/public/signup.html");
    res.sendFile(__dirname + "/public/signup.html");
})

app.get("/blog", (req, res)=>{
    console.log(__dirname+"/public/blog.html");
    res.sendFile(__dirname + "/public/blog.html");
})

app.get("/404", (req, res)=>{
    console.log(__dirname+"/public/404.html");
    res.sendFile(__dirname + "/public/404.html");
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
=======
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "signup"
});

// Middleware setup
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

// Handle errors gracefully
function handleDatabaseError(res, err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred on the server." });
}

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) {
            handleDatabaseError(res, err);
        } else {
            res.json({ data });
        }
    });
});

app.post("/users", (req, res) => {
    const q = "INSERT INTO users (Name, Age, Year) VALUES (?, ?, ?)";
    const values = [req.body.Name, req.body.Age, req.body.Year];

    db.query(q, values, (err, result) => {
        if (err) {
            handleDatabaseError(res, err);
        } else {
            res.json({ message: "User has been created!", data: result });
        }
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});

