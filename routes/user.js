require("dotenv").config()

const Router = require('koa-router');
// const Koa = require("koa");
// const user_query = require("../repositry/user_repo")

// const app = new Koa();




const db = require("../db/database");
const bcrypt = require("bcrypt");
const Koa = require("koa");
const json = require("koa-json");
const koaBody = require('koa-body');
const jwt = require("jsonwebtoken");
var bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');






const app = new Koa();
app.use(bodyParser());
// middleware functions
app.use(koaBody());
app.use(cors());
app.use(json());


const router = new Router({	prefix: '/users'});
app.use(router.routes()).use(router.allowedMethods());



function isValidId(ctx, next) {
	if(!isNaN(ctx.params.user_id)) return next();
	next(new Error('Invalid ID'));
  }


async function  headerauth (ctx,next){ 
	try {	
// access the authorization header
const authHeader = ctx.get('Authorization');
const token = authHeader && authHeader.split(' ')[1];    
if(token === null || typeof(token) === "undefined"){
	//tell the user you do not have access
	 ctx.response.status = 401;
	 ctx.body = {      message: "Unauthorized Access"   }; 
}
//if token is not null then
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	ctx.user = decoded.user_id
	console.log(ctx.user);
		await next()
} 
catch(err){
			ctx.response.status = 401;
		    ctx.body = {      message: "you don't have access"   }; 

}
}
router.get('/purchases/:item_id', headerauth, async (ctx) =>{
	const {item_id} = ctx.params;
		try {
			 await db('inventory as i')
            .innerJoin('vehicle as v', 'v.id', 'i.id')
            .select('v.name','i.statuss','v.img_url','v.Price','i.color')
            .where({item_id}).then((data)=>{  
			 ctx.response.status = 200;
             ctx.body={ json: data }
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
})

			

			
// api to get vehicle price,dealer for that vehicle and inventory id to post in receipt table
async function getDetails (ctx,next){
	const {item_id} = ctx.params;
		try {
			await db('inventory as i')
			.innerJoin('dealer as d', 'd.dealer_id', 'i.dealer_id')
			.innerJoin('vehicle as v', 'v.id', 'i.id')
            .select('i.item_id','d.dealer_id','v.Price')
            .where({item_id}).then((data)=>{  
			 ctx.response.status = 200;
             ctx.data = data
			 next()
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
}

router.post('/completeOrder/:item_id', getDetails, headerauth, async (ctx) =>{
	try{
		const {method} = ctx.request.body; 
		   
			 await db('receipt').insert({
				unit_price:ctx.data[0].Price,
				method:method,
				dealer_id:ctx.data[0].dealer_id,
				inventory_id:ctx.data[0].item_id,
				user_id:ctx.user
				})
				.then((data)=>{
					ctx.response.status = 200;
					ctx.body = { message: data}
				})

	}catch(error){
					ctx.response.status = 500;
					ctx.body = {      message: error.message   }; 
				 }	
})


// To get data with specific id  in  vehicle specs and features
router.get('/inventory/:item_id',headerauth ,async (ctx) =>{
	const {item_id} = ctx.params;
	try{
			await db('inventory as i')
            .innerJoin('vehicle as v', 'v.id', 'i.id')
			.innerJoin('dealer as d', 'd.dealer_id', 'i.dealer_id')
            .select('v.make', 'v.model','v.name','v.status',
			'v.engine_type','v.engine_capacity','v.img_url',
			'v.transmission','i.color','i.mileage','d.company_name')
            .where({item_id})
			.then((data)=>{  
			console.log("inventory",data);
			 ctx.response.status = 200;
             ctx.body={ json: data }
			})
					 	
        
    }catch(error){
        ctx.response.status = 500;
		ctx.body = {      message: error.message   }; 
    }	
})


// home page
router.get('/vehicles',   async (ctx) => { 
	try {
		const limit = parseInt(ctx.query.limit)
		 await db('vehicle').select("name","Price","img_url","id").limit(limit).then((data)=>{
		ctx.response.status = 200;
		 ctx.body={  data }
		//  console.log(data)
	 })
	 } 
	 catch (err) {
		 ctx.response.status = 500;
		 ctx.body = {      message: err.message       };  
				 }
				})
		



// get all users
router.get('/', async (ctx) => {
    try {
       await db('user').select().then((data)=>{
       ctx.response.status = 200;
        ctx.body={ json: data }

		
	})
    } 
    catch (err) {
        ctx.response.status = 500;
        ctx.body = {      message: err.message       };  
                }
})





// For signup 
// http://localhost:3000/users/signup
router.post('/signup',  async (ctx) =>{
    
	try {
	  const {name,email,password,phone} = ctx.request.body;
	  const hash = await bcrypt.hash(password,10);
  
	  const user = await db('user').insert({
		name:name,
		email:email,
		password:hash,
		phone:phone 
		})
		if(user){
			ctx.response.status = 200;
			ctx.body={message:"Signup Successful"} 
			
			
		}
		// const token = jwt.sign({email:email}, process.env.JWT_SECRET,{expiresIn: '30s' })
	
  // For duplicate entry
	} catch  {
		      ctx.response.status = 400;
			  ctx.body = {      message: "User already exist"      };  
	}  
   }   )




// For login
//http://localhost:3000/users/login
router.post('/login',  async (ctx,next) =>{
    try{
      const {email,password,user_id} = ctx.request.body;
      const user = await db('user').first("*").where({email:email});
      if(user){
        
        const validPass = await bcrypt.compare(password, user.password);
        if(validPass){

     // Generating JWT
     // 1- Gets us access to user
     // 2- secret token
     // 3- expiration date which we have not used here
           
          const token = jwt.sign({user_id:user.user_id}, process.env.JWT_SECRET,
            {expiresIn: '1200s' })
           
           await next()

          ctx.response.status = 200;
          ctx.body={ message:"valid email and password!",token:token };
		


        }
        else{
          ctx.body={ message:"invalid password!" };
		  ctx.response.status = 404;

        }
      }
      else{
        ctx.response.status = 404;
        ctx.body={ message:"User not found!" }
      }

    }

    catch (err) {
          ctx.response.status = 500;
          ctx.body = {      message: err.message      };  
      }  
 
 })







// To get data with specific id  
router.get('/:user_id', isValidId, async (ctx) =>{
	const {user_id} = ctx.params;
		try {
			await db('user').where({user_id}).select().then((data)=>{  
			       ctx.response.status = 200;
             ctx.body={ json: data }
		  })
		}
		   catch (err) {
			ctx.response.status = 500;
			ctx.body = {      message: err.message       };  
		}
});


// // To post data in the table
// 	 router.post('/',user_query.postdata  );
  
  
// To delete data from the table with specific id
router.delete('/:user_id', isValidId, async (ctx) =>{
	const {user_id} = ctx.params;
	try {
	  const count = await db('user').where({user_id}).del();
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
router.put('/:user_id', isValidId, async (ctx) =>{
    const {user_id} = ctx.params;
    const changes = ctx.request.body;
    try {
      const count = await db('user').where({user_id}).update(changes);
        if (!count) {
			ctx.response.status = 404;
			ctx.body={ message: "Record not found"}	
        
      } else {
        await db('user').select('*').where("user_id",user_id).then((data)=>{
			ctx.response.status = 201;
			ctx.body={json:data} 
         
        });
      }
    } 
    catch (err) {
		ctx.response.status = 500;
		ctx.body = {      message: err.message       }; 	
    }
  } );
  

module.exports = router;




// After login go to home page
// http://localhost:3000/users/home
// router.get('/home', headerauth ,async (ctx) =>{

// 	try{
//         if(!ctx.user){
// 			ctx.response.status = 403;
// 		    ctx.body = {      message: "You donot have access"    }; 
            
//         }else{
// 			 ctx.response.status = 200;
// 			ctx.body = {      message: "This is home page" ,  user:ctx.user.user_id    }; 
		
//         }
//     }catch(error){
//         ctx.response.status = 500;
// 		ctx.body = {      message: error.message   }; 
//     }
//    })
