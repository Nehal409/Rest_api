const Router = require('koa-router');
const Koa = require("koa");
const receipt_query = require("../repositry/receipt_repo")
const app = new Koa();




const router = new Router({	prefix: '/receipts'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.receipt_number)) return next();
	next(new Error('Invalid ID'));
  }


// To get data   
router.get('/',receipt_query.getAll)


// To get data with specific id  
router.get('/:receipt_number', isValidId,receipt_query.getById );


// To post data in the table
	 router.post('/',receipt_query.postdata  );
  
  
// To delete data from the table with specific id
router.delete('/:receipt_number', isValidId,receipt_query.deleteData );



  // To update data
  router.put('/:receipt_number', isValidId,receipt_query.updateData);
  

module.exports = router;





