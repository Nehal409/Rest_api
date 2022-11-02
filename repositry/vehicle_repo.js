

const db = require("../db/database");

// exports.getAll = async (ctx) => {
    
//     try {
//         await db('vehicle').select().then((data)=>{
//         ctx.response.status = 200;
//          ctx.body={ json: data }
//      })
//      } 
//      catch (err) {
//          ctx.response.status = 500;
//          ctx.body = {      message: err.message       };  
//                  }
     
//     };


// cars.html all cars
exports.getallcars =   async (ctx) => { 
	try {
	
		await db('vehicle').select("name","Price","img_url").then((data)=>{
		ctx.response.status = 200;
		 ctx.body={ json: data }
		//  console.log(data)
	 })
	 } 
	 catch (err) {
		 ctx.response.status = 500;
		 ctx.body = {      message: err.message       };  
				 }
				}

exports.getById = async (ctx) =>{
	const {id} = ctx.params;
		try {
			await db('vehicle').where({id}).select("name","Price","img_url").then((data)=>{  
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
    await db('vehicle').insert(postData).then(()=>{  
      ctx.response.status = 200;
      ctx.body={ json: postData }
   })  
  } catch (err) {
      ctx.response.status = 500;
      ctx.body = {      message: err.message       }; 		} 
    }     


exports.deleteData = async (ctx) =>{
	const {id} = ctx.params;
	try {
	  const count = await db('vehicle').where({id}).del();
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



exports.updateData = async (ctx) =>{
    const {id} = ctx.params;
    const changes = ctx.request.body;
    try {
      const count = await db('vehicle').where({id}).update(changes);
        if (!count) {
			ctx.response.status = 404;
			ctx.body={ message: "Record not found"}	
        
      } else {
        await db('vehicle').select('*').where("id",id).then((data)=>{
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
