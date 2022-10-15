const Router = require('koa-router');
const contact_query = require("../repositry/contatc_repo")
const Koa = require("koa");

const app = new Koa();


const router = new Router({	prefix: '/contacts'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.contact_id)) return next();
	next(new Error('Invalid ID'));
 }


// To get data   
router.get('/',contact_query.getAll)


// To get data with specific id  
router.get('/:contact_id', isValidId,contact_query.getById);


// To post data in the table
router.post('/', contact_query.postdata);
  
  
// To delete data from the table with specific id
router.delete('/:contact_id', isValidId, contact_query.deleteData);


// To update data
router.put('/:contact_id', isValidId, contact_query.updateData);
  

module.exports = router;





