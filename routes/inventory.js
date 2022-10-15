const Router = require('koa-router');
const Koa = require("koa");
const inventory_query = require("../repositry/inventory_repo")

const app = new Koa();


const router = new Router({	prefix: '/inventory'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.item_id)) return next();
	next(new Error('Invalid ID'));
  }


// To get data   
router.get('/',inventory_query.getAll)


// To get data with specific id  
router.get('/:item_id', isValidId,inventory_query.getById);


// To post data in the table
router.post('/', inventory_query.postdata );
  
  
// To delete data from the table with specific id
router.delete('/:item_id', isValidId, inventory_query.deleteData);


// To update data
router.put('/:item_id', isValidId,inventory_query.updateData );
  

module.exports = router;





