const Router = require('koa-router');
const db = require("../db/database");
const Koa = require("koa");

const app = new Koa();


const router = new Router({	prefix: '/dealers'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.dealer_id)) return next();
	next(new Error('Invalid ID'));
  }


// To get data   
router.get('/',async (ctx) => {
    try {
       await db('dealer').select().then((data)=>{
       ctx.response.status = 200;
        ctx.body={ json: data }
	})
    } 
    catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       };  
                }
  })


// To get data with specific id  
router.get('/:dealer_id', isValidId, async (ctx) =>{
	const {dealer_id} = ctx.params;
		try {
			await db('dealer').where({dealer_id}).select().then((data)=>{  
			       ctx.response.status = 200;
             ctx.body={ json: data }
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
	 });


// To post data in the table
	 router.post('/',  async (ctx) =>{

		const postData = ctx.request.body;
		try {
		  await db('dealer').insert(postData).then(()=>{  
			ctx.response.status = 200;
			ctx.body={ json: postData }
		 })  
		} catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       }; 		} 
		});
  
  
// To delete data from the table with specific id
router.delete('/:dealer_id', isValidId, async (ctx) =>{
	const {dealer_id} = ctx.params;
	try {
	  const count = await db('dealer').where({dealer_id}).del();
	    if (!count) {
		    ctx.response.status = 404;
			ctx.body={ message: "Record not found"}
		     
	  } else {
		    ctx.response.status = 200;
			ctx.body={message:"Data successfully deleted"} 
	  }  
	}
	catch (err) {
		ctx.response.status = 500;
		ctx.body = {      message: err.message       }; 		
	}
  });



  // To update data
  router.put('/:dealer_id', isValidId, async (ctx) =>{
    const {dealer_id} = ctx.params;
    const changes = ctx.request.body;
    try {
      const count = await db('dealer').where({dealer_id}).update(changes);
        if (!count) {
			ctx.response.status = 404;
			ctx.body={ message: "Record not found"}	
        
      } else {
        await db('dealer').select('*').where("dealer_id",dealer_id).then((data)=>{
			ctx.response.status = 201;
			ctx.body={json:data} 
         
        });
      }
    } 
    catch (err) {
		ctx.response.status = 500;
		ctx.body = {      message: err.message       }; 	
    }
  });
  

module.exports = router;





