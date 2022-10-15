const Koa = require("koa");
const json = require("koa-json");
const koaBody = require('koa-body');

const vehiclekoa = require("./routes/vehicle");
const userkoa = require("./routes/user");
const receiptkoa = require("./routes/receipt");
const inventorykoa = require("./routes/inventory");
const dealerkoa = require("./routes/dealer");
const customerContactkoa = require("./routes/customer_cont_form");


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





