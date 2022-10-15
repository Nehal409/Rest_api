const Router = require('koa-router');
const Koa = require("koa");
const user_query = require("../repositry/user_repo")

const app = new Koa();


const router = new Router({	prefix: '/users'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.user_id)) return next();
	next(new Error('Invalid ID'));
  }


// To get data   
router.get('/',user_query.getAll)

// For signup 
router.post('/signup',user_query.signup)

// For login
router.post('/login',user_query.login)


// To get data with specific id  
router.get('/:user_id', isValidId, user_query.getById);


// To post data in the table
	 router.post('/',user_query.postdata  );
  
  
// To delete data from the table with specific id
router.delete('/:user_id', isValidId,user_query.deleteData);



  // To update data
  router.put('/:user_id', isValidId,user_query.updateData );
  

module.exports = router;





