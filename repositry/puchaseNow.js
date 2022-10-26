const db = require("../db/database");
require("dotenv").config()

// Purchse details on order now webpage
exports.purchaseDetails =  async (ctx) =>{
	const {item_id} = ctx.params;
		try {
			 await db('inventory as i')
            .innerJoin('vehicle as v', 'v.id', 'i.id')
            .select('v.name','v.status','v.img_url','v.Price','i.color')
            .where({item_id}).then((data)=>{  
			 ctx.response.status = 200;
             ctx.body={ json: data }
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
}


// Purchas now form details
// exports.checkUser =  async (ctx,next) =>{
// 	const token = jwt.sign({email:email,user_id:user_id}, process.env.JWT_SECRET,
// 		{expiresIn: '1200s' })

// 		if(token){
// 			 jwt.verify(token,process.env.JWT_SECRET,(err)=>{
// 				if(err){
// 					ctx.response.status = 404;
// 			         ctx.body = {      message: err.message       };  
// 				}else{
					
// 				}
// 			 })
			  
			
// 		}
// 		else{

// 		}
// }