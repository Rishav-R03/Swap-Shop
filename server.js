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
    var product_id = req.body.product_id;
    var product_name = req.body.product_name;
    var product_price = req.body.product_price;
    var product_des = req.body.product_des;
    
    con.connect(function(error,result){
        if(error) throw error;
        var sql = "INSERT INTO login (product_name,product_price , product_des) VALUES (?, ?, ?)";
        con.query(sql, [product_name,product_price,product_des], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error inserting user into the database.");
        }
        res.send("User Added Successfully: " + result.insertId);
        });
    
    });
    
});
app.get("/signup",function(req,res){
    console.log(__dirname+'/public/signup.html');
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
app.get("/", function (req, res) {
    const searchForm = `
        <form action="/search" method="post">
            <input type="text" name="searchQuery" placeholder="Search for products">
            <button type="submit">Search</button>
        </form>
    `;
    res.send(searchForm);
});
app.post("/search", function (req, res) {
    const searchQuery = req.body.searchQuery;

    // Replace with a query to search for products in your database
    const sql = "SELECT * FROM products WHERE product_name LIKE ?";
    con.query(sql, ["%" + searchQuery + "%"], function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error searching for products." });
        }
        
        // Display search results
        const resultHtml = results.map(result => `<p>${result.product_name}</p>`).join("");
        res.send(`<h2>Search Results:</h2>${resultHtml}`);
    });
});
app.get("/deleteProduct", function (req, res) {
    // Replace with a query to get a list of products from your database
    const sql = "SELECT * FROM sell";
    con.query(sql, function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error retrieving products." });
        }
        res.json(results);
    });
});
app.post("/products", function (req, res) {
    // Replace with code to insert a new product into your database
    const { productName, price } = req.body;
    const sql = "INSERT INTO products (product_name, product_price) VALUES (?, ?)";
    con.query(sql, [productName, price], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error inserting product into the database." });
        }
        res.json({ message: "Product added successfully", insertedId: result.insertId });
    });
});
app.delete("/deleteproducts/:productId", function (req, res) {
    // Get the productId from the request URL parameters
    const productId = req.params.productId;
    
    // Replace with code to delete a product based on productId
    const sql = "DELETE FROM products WHERE product_id = ?";
    con.query(sql, [productId], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error deleting product from the database." });
        }
        res.json({ message: "Product deleted successfully" });
    });
});

//updating data
app.get("/products", function (req, res) {
    // Replace with a query to get a list of products from your database
    const sql = "SELECT * FROM products";
    con.query(sql, function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error retrieving products." });
        }
        res.json(results);
    });
});
app.post("/products", function (req, res) {
    // Replace with code to insert a new product into your database
    const { productName, price } = req.body;
    const sql = "INSERT INTO products (product_name, product_price) VALUES (?, ?)";
    con.query(sql, [productName, price], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error inserting product into the database." });
        }
        res.json({ message: "Product added successfully", insertedId: result.insertId });
    });
});
app.put("/products/:productId", function (req, res) {
    // Get the productId from the request URL parameters
    const productId = req.params.productId;
    
    // Get updated product information from the request body
    const { productName, price } = req.body;
    
    // Replace with code to update a product based on productId
    const sql = "UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?";
    con.query(sql, [productName, price, productId], function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error updating product in the database." });
        }
        res.json({ message: "Product updated successfully" });
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
