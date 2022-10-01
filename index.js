const express = require('express');
const app = express()
const userRoute = require("./routes/vehicle");
// const mysql2 = require("mysql2");



// express.json and express.urlencoded POST and PUT request

//express.json() 
//is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

//express.urlencoded() is a method inbuilt in express
// to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

//Home page
app.get('/',  (req, res) =>{
  res.send('Hello World');
})


//whenever we will go /api/vehicle/? given routes in vehicle.js file"
app.use("/api",userRoute); 


 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Port is " + port));