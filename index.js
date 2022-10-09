const Koa = require("koa");
const json = require("koa-json");
const koaBody = require('koa-body');


const vehiclekoa = require("./koa/vehicle-koa");
const userkoa = require("./koa/user-koa");
const receiptkoa = require("./koa/receipt-koa");
const inventorykoa = require("./koa/inventory-koa");
const dealerkoa = require("./koa/dealer-koa");
const customerContactkoa = require("./koa/customer_cont_form-koa");


const app = new Koa();

// middleware functions
app.use(koaBody());
app.use(json());


//Routes
app.use(vehiclekoa.routes()).use(vehiclekoa.allowedMethods());

app.use(userkoa.routes()).use(userkoa.allowedMethods());

app.use(receiptkoa.routes()).use(receiptkoa.allowedMethods());

app.use(inventorykoa.routes()).use(inventorykoa.allowedMethods());

app.use(dealerkoa.routes()).use(dealerkoa.allowedMethods());

app.use(customerContactkoa.routes()).use(customerContactkoa.allowedMethods());







const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Port is " + port));





// const express = require('express');
// const app = express()
// const vehicleRoute = require("./routes/vehicle");
// const userRoute = require("./routes/user");
// const dealerRoute = require("./routes/dealer");
// const customerContactRoute = require("./routes/customer_cont_form");
// const receiptRoute = require("./routes/receipt");
// const inventoryRoute = require("./routes/inventory");

// const mysql2 = require("mysql2");

//"https://devhints.io/knex" knex js cheatsheet

// express.json and express.urlencoded POST and PUT request

//express.json() 
//is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
// app.use(express.json());

//express.urlencoded() is a method inbuilt in express
// to recognize the incoming Request Object as strings or arrays
// app.use(express.urlencoded({ extended: true }));

// //Home page
// app.get('/',  (req, res) =>{
//   res.send('Hello World');
// })


// //whenever we will go /api/vehicles given routes in vehicle.js file"
// app.use("/api",vehicleRoute); 

// //whenever we will go /api/users given routes in user.js file"
// app.use("/api",userRoute); 

// //whenever we will go /api/dealers given routes in dealer.js file"
// app.use("/api",dealerRoute); 

// //whenever we will go /api/contacts given routes in customer_cont_form.js file"
// app.use("/api",customerContactRoute); 

// //whenever we will go /api/receipts given routes in receipt.js file"
// app.use("/api",receiptRoute); 

// //whenever we will go /api/inventory given routes in inventory.js file"
// app.use("/api",inventoryRoute); 


// const port = process.env.PORT || 3000;
// app.listen(port, ()=> console.log("Port is " + port));