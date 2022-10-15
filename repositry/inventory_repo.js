const db = require("../db/database");



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





exports.getById =  async (ctx) =>{
	const {item_id} = ctx.params;
		try {
			await db('inventory').where({item_id}).select().then((data)=>{  
			       ctx.response.status = 200;
             ctx.body={ json: data }
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
}





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
