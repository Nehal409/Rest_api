const Router = require('koa-router');
const Koa = require('koa');
const inventory_query = require('../repositry/inventory_repo');
const json = require('koa-json');
const koaBody = require('koa-body');

const app = new Koa();
app.use(koaBody());
app.use(json());

const router = new Router({ prefix: '/inventory' });
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
    if (!isNaN(ctx.params.item_id)) return next();
    next(new Error('Invalid ID'));
}

// To get data
router.get('/', inventory_query.getAll);

// To post data in the table
router.post('/', inventory_query.postdata);

// To delete data from the table with specific id
router.delete('/:item_id', isValidId, inventory_query.deleteData);

// To update data
router.put('/:item_id', isValidId, inventory_query.updateData);

module.exports = router;
