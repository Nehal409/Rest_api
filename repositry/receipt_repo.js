const db = require("../db/database");

exports.getAll = async (ctx) => {
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
  }





exports.getById = async (ctx) =>{
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
	 }





exports.postdata = async (ctx) =>{

    const postData = ctx.request.body;
    try {
      await db('receipt').insert(postData).then(()=>{  
        ctx.response.status = 200;
        ctx.body={ json: postData }
     })  
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       }; 		} 
    };





exports.deleteData = async (ctx) =>{
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
  }




exports.updateData =  async (ctx) =>{
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
  }
