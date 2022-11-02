const Router = require('koa-router');
const Koa = require("koa");
const vehicle_query = require("../repositry/vehicle_repo")
const search = require("../repositry/searchbar");

const app = new Koa();

// Prefix all routes with: /vehicle which means all 
// endpoints in vehicle-koa will start with /vehicle
const router = new Router({	prefix: '/vehicles'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.id)) return next();
	next(new Error('Invalid ID'));
  }

  
// To get all cars    
router.get('/',vehicle_query.getallcars)


// For search Bar
// router.get('/search/', search.searchvehicle)



// To get data with specific id  
router.get('/:id', isValidId, vehicle_query.getById);


// To post data in the table
router.post('/',vehicle_query.postdata );
  
  
// To delete data from the table with specific id
router.delete('/:id', isValidId, vehicle_query.deleteData);


// To update data
router.put('/:id', isValidId, vehicle_query.updateData);
  

module.exports = router;