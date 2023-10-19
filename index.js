// adding the logic and responses of website
var mysql = require("mysql")
// const mysql = require('mysql');
var express = require('express');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'products'
});
con.connect(function(error){
    if(error) throw error;
    console.log("connected !")

    con.query("SELECT * FROM details ",function(error,result){
        if(error) throw error;
        console.log(result);//to get all rows
        console.log(result[0]);//to get first node
        console.log(result[0].product_name);//to get first product name
        console.log(result[0].product_id);//to get first product id
        console.log(result[0].product_price);//to get first product price
    });

});
 
app.get("/signup",function(req,res){
    console.log(__dirname+'/public/signup.html')
    res.sendFile(__dirname+'/public/signup.html');
})
app.post('/signup',function(req,res){
    console.log(req.body);

    res.send('Data received sucessfully !');
});
app.listen(8000,()=>{
    console.log('Server running at port 8000')
});
