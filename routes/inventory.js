const Router = require('koa-router');
const Koa = require("koa");
const inventory_query = require("../repositry/inventory_repo")
const homePagination_query = require("../repositry/homePagination")
const purchaseNow = require('../repositry/puchaseNow');
const json = require("koa-json");
const koaBody = require('koa-body');
const jwt = require("jsonwebtoken");


const app = new Koa();
app.use(koaBody());
app.use(json());

const router = new Router({	prefix: '/inventory'});
app.use(router.routes()).use(router.allowedMethods());


// function  headerauth (ctx,next){  
// 	// access the authorization header
// 	const authHeader = ctx.get('Authorization');
// 	const token = authHeader && authHeader.split(' ')[1];    
// 	if(token === null || typeof(token) === "undefined"){
// 		//tell the user you do not have access
// 		 ctx.response.status = 401;
// 		 ctx.body = {      message: "Unauthorized Access"   }; 
// 	}
	
// 	//if token is not null then
// 	jwt.verify(token, process.env.JWT_SECRET, (error, user) =>{
// 		if(error) {
// 			ctx.response.status = 403;
// 			ctx.body = {      message: "Forbidden Access:Token Expired"   }; 
// 		}
	
// 		//if the user is verified get user id
// 		ctx.user = user;
// 		next(); //move on
// 	})
// }
function isValidId(ctx, next) {
	if(!isNaN(ctx.params.item_id)) return next();
	next(new Error('Invalid ID'));
  }



// For Home Page
router.get('/home',homePagination_query.homePage)


// For purchase now page details
// router.get('/purchases/:item_id',purchaseNow.purchaseDetails)


// To get data   
router.get('/',inventory_query.getAll)


// To get data with specific id  in  vehicle specs and features
// router.get('/:item_id', isValidId,headerauth,inventory_query.getInventoryForCars);



// To post data in the table
router.post('/', inventory_query.postdata );
  
  
// To delete data from the table with specific id
router.delete('/:item_id', isValidId, inventory_query.deleteData);


// To update data
router.put('/:item_id', isValidId,inventory_query.updateData );


module.exports = router;





