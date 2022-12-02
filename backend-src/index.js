const Koa = require('koa');
const json = require('koa-json');
const koaBody = require('koa-body');
const serve = require('koa-static');
const cors = require('@koa/cors');

const vehiclekoa = require('./routes/vehicle');
const userkoa = require('./routes/user');
const receiptkoa = require('./routes/receipt');
const inventorykoa = require('./routes/inventory');
const dealerkoa = require('./routes/dealer');
const customerContactkoa = require('./routes/customer_cont_form');
const Logging = require('./library/logging');

const app = new Koa();
app.use(cors());

// middleware functions
app.use(koaBody());
app.use(json());

app.use(serve('./public'));

//Routes
app.use(vehiclekoa.routes()).use(vehiclekoa.allowedMethods());

app.use(userkoa.routes()).use(userkoa.allowedMethods());

app.use(receiptkoa.routes()).use(receiptkoa.allowedMethods());

app.use(inventorykoa.routes()).use(inventorykoa.allowedMethods());

app.use(dealerkoa.routes()).use(dealerkoa.allowedMethods());

app.use(customerContactkoa.routes()).use(customerContactkoa.allowedMethods());

app.use((ctx, next) => {
    const error = new Error('not found');
    Logging.error(error);
    ctx.status = 500;
    ctx.body = { message: error.message };
    next();
});

const port = process.env.port;
app.listen(port, () => Logging.info(`Server is running on port ${port}`));
