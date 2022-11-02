const db = require("../db/database");


// car specs and features





exports.getAll = async (ctx) => {
    try {
       await db('inventory').select().then((data)=>{
       ctx.response.status = 200;
        ctx.body={ json: data }
	})
    } 
    catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       };  
                }
}





// exports.getInventoryForCars =  async (ctx) =>{
// 	const {item_id} = ctx.params;
// 		try {
// 			await db('inventory as i')
//             .innerJoin('vehicle as v', 'v.id', 'i.id')
// 			.innerJoin('dealer as d', 'd.dealer_id', 'i.dealer_id')
//             .select('v.make', 'v.model','v.name','v.status',
// 			'v.engine_type','v.engine_capacity','v.img_url',
// 			'v.transmission','i.color','i.mileage','d.company_name')
//             .where({item_id}).then((data)=>{  
// 			 ctx.response.status = 200;
//              ctx.body={ json: data }
// 		  })
// 		}
// 		   catch (err) {
// 			ctx.response.status = 500;
// 			ctx.body = {      message: err.message       };  
// 		}
// }









exports.postdata = async (ctx) =>{

		const postData = ctx.request.body;
		try {
		  await db('inventory').insert(postData).then(()=>{  
			ctx.response.status = 200;
			ctx.body={ json: postData }
		 })  
		} catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       }; 		} 
}





exports.deleteData = async (ctx) =>{
	const {item_id} = ctx.params;
	try {
	  const count = await db('inventory').where({item_id}).del();
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
}





exports.updateData =   async (ctx) =>{
    const {item_id} = ctx.params;
    const changes = ctx.request.body;
    try {
      const count = await db('inventory').where({item_id}).update(changes);
        if (!count) {
			ctx.response.status = 404;
			ctx.body={ message: "Record not found"}	
        
      } else {
        await db('inventory').select('*').where("item_id",item_id).then((data)=>{
			ctx.response.status = 201;
			ctx.body={json:data} 
         
        });
      }
    } 
    catch (err) {
		ctx.response.status = 500;
		ctx.body = {      message: err.message       }; 	
    }
}
