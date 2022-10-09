const Router = require('koa-router');
const db = require("../db/database");
const Koa = require("koa");

const app = new Koa();


const router = new Router({	prefix: '/receipts'});
app.use(router.routes()).use(router.allowedMethods());

function isValidId(ctx, next) {
	if(!isNaN(ctx.params.receipt_number)) return next();
	next(new Error('Invalid ID'));
  }


// To get data   
router.get('/',async (ctx) => {
    try {
       await db('receipt').select().then((data)=>{
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
router.get('/:receipt_number', isValidId, async (ctx) =>{
	const {receipt_number} = ctx.params;
		try {
			await db('receipt').where({receipt_number}).select().then((data)=>{  
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
		  await db('receipt').insert(postData).then(()=>{  
			ctx.response.status = 200;
			ctx.body={ json: postData }
		 })  
		} catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       }; 		} 
		});
  
  
// To delete data from the table with specific id
router.delete('/:receipt_number', isValidId, async (ctx) =>{
	const {receipt_number} = ctx.params;
	try {
	  const count = await db('receipt').where({receipt_number}).del();
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
  router.put('/:receipt_number', isValidId, async (ctx) =>{
    const {receipt_number} = ctx.params;
    const changes = ctx.request.body;
    try {
      const count = await db('receipt').where({receipt_number}).update(changes);
        if (!count) {
			ctx.response.status = 404;
			ctx.body={ message: "Record not found"}	
        
      } else {
        await db('receipt').select('*').where("receipt_number",receipt_number).then((data)=>{
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





