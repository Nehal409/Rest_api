const db = require("../db/database");

exports.getAll = async (ctx) => {
    try {
       await db('customer_contact').select().then((data)=>{
       ctx.response.status = 200;
        ctx.body={ json: data }
	})
    } 
    catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       };  
                }
  }





// exports.getById =  async (ctx) =>{
// 	const {contact_id} = ctx.params;
// 		try {
// 			await db('customer_contact').where({contact_id}).select().then((data)=>{  
// 			       ctx.response.status = 200;
//              ctx.body={ json: data }
// 		  })
// 		}
// 		   catch (err) {
// 			ctx.response.status = 500;
// 			ctx.body = {      message: err.message       };  
// 		}
// 	 }





exports.postdata =   async (ctx) =>{

    const postData = ctx.request.body;
    try {
      await db('customer_contact').insert(postData).then(()=>{  
        ctx.response.status = 200;
        ctx.body={ json: "Your request have been registered" }
     })  
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       }; 		} 
    }





// exports.deleteData = async (ctx) =>{
// 	const {contact_id} = ctx.params;
// 	try {
// 	  const count = await db('customer_contact').where({contact_id}).del();
// 	    if (!count) {
// 		    ctx.response.status = 404;
// 			ctx.body={ message: "Record not found"}
		     
// 	  } else {
// 		    ctx.response.status = 200;
// 			ctx.body={message:"Data successfully deleted"} 
// 	  }  
// 	}
// 	catch (err) {
// 		ctx.response.status = 500;
// 		ctx.body = {      message: err.message       }; 		
// 	}
//   }




// exports.updateData =  async (ctx) =>{
//     const {contact_id} = ctx.params;
//     const changes = ctx.request.body;
//     try {
//       const count = await db('customer_contact').where({contact_id}).update(changes);
//         if (!count) {
// 			ctx.response.status = 404;
// 			ctx.body={ message: "Record not found"}	
        
//       } else {
//         await db('customer_contact').select('*').where("contact_id",contact_id).then((data)=>{
// 			ctx.response.status = 201;
// 			ctx.body={json:data} 
         
//         });
//       }
//     } 
//     catch (err) {
// 		ctx.response.status = 500;
// 		ctx.body = {      message: err.message       }; 	
//     }
//   }