const Router = require('koa-router');
const Koa = require('koa');
const dealer_query = require('../repositry/dealer_repo');
const app = new Koa();

const router = new Router({ prefix: '/dealers' });
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
    if (!isNaN(ctx.params.dealer_id)) return next();
    next(new Error('Invalid ID'));
}

// To get data
router.get('/', dealer_query.getAll);

// To get data with specific id
router.get('/:dealer_id', isValidId, dealer_query.getById);

// To post data in the table
router.post('/', dealer_query.postdata);

// To delete data from the table with specific id
router.delete('/:dealer_id', isValidId, dealer_query.deleteData);

// To update data
router.put('/:dealer_id', isValidId, dealer_query.updateData);

module.exports = router;
