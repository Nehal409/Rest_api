const Router = require('koa-router');
const Koa = require("koa");
const user_query = require("../repositry/user_repo")


// Middleware
const jwtauth = require('../authentication/jwtAuth');

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
// http://localhost:3000/users/signup
router.post('/signup',user_query.signup)

// For login
//http://localhost:3000/users/login
router.post('/login',user_query.login)

// After login go to home page
// http://localhost:3000/users/home
router.get('/home', jwtauth.auth , user_query.home)


// To get data with specific id  
router.get('/:user_id', isValidId, user_query.getById);


// // To post data in the table
// 	 router.post('/',user_query.postdata  );
  
  
// To delete data from the table with specific id
router.delete('/:user_id', isValidId,user_query.deleteData);


// To update data
router.put('/:user_id', isValidId,user_query.updateData );
  

module.exports = router;





