const express = require('express');
const app = express()
const userRoute = require("./routes/vehicle");



app.use(express.json());

app.get('/',  (req, res) =>{
  res.send('Hello World');
})

app.use("/api/vehicle",userRoute); //whenever we will go /api/vehicle/? given routes in vehicle.js file"


 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Port is " + port));