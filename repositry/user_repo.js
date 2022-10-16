require("dotenv").config()


const db = require("../db/database");
const bcrypt = require("bcrypt");
const Koa = require("koa");
const json = require("koa-json");
const koaBody = require('koa-body');
const jwt = require("jsonwebtoken");


const app = new Koa();

// middleware functions
app.use(koaBody());
app.use(json());




exports.getAll = async (ctx) => {
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
}


 
exports.signup = async (ctx) =>{
    
  try {
    const {name,email,password,phone} = ctx.request.body;
    const hash = await bcrypt.hash(password,10);

    await db('user').insert({
      name:name,
      email:email,
      password:hash,
      phone:phone 
      })
      // const token = jwt.sign({email:email}, process.env.JWT_SECRET,{expiresIn: '30s' })
      ctx.response.status = 200;
      ctx.body={message:"Signup Successful"} 
      
// For duplicate entry
  } catch (err) {
      ctx.response.status = 400;
			ctx.body = {      message: "User already exist"      };  
  }  
 }   




 exports.login = async (ctx) =>{
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
          const token = jwt.sign({email:email,user_id:user_id}, process.env.JWT_SECRET,
            {expiresIn: '1200s' })

          ctx.response.status = 200;
          ctx.body={ message:"valid email and password!",token:token };
        }
        else{
          ctx.body={ message:"invalid password!" };

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
 
 }


 

 exports.home = async (ctx) =>{
  ctx.body={ message:"Thid is home page" }
 }




exports.getById = async (ctx) =>{
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
}





// exports.postdata = async (ctx) =>{

//     const postData = ctx.request.body;
//     try {
//       await db('user').insert(postData).then(()=>{  
//         ctx.response.status = 200;
//         ctx.body={ json: postData }
//      })  
//     } catch (err) {
//         ctx.response.status = 500;
//         ctx.body = {      message: err.message       }; 		} 
// }





exports.deleteData =  async (ctx) =>{
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
}





exports.updateData = async (ctx) =>{
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
  }










// const {name,email,password,phone} = ctx.request.body;
 
  // // try {
  // //    bcrypt.hash(password, 10).then((hash)=>{
  // //     db('user').insert({name:name,email:email,password:hash,phone:phone})
  // //     ctx.response.status = 200;
  // //     ctx.body={ json: "user registered" }
    
  // //    })

  // // } catch (err) {
  // //     ctx.response.status = 500;
  // //     ctx.body = {      message: err.message       }; 		} 

  // // Hash the password
  //  bcrypt.hash(password, 10).then((hash)=>{
  //      db('user').insert({
  //     name:name,
  //     email:email,
  //     password:hash,
  //     phone:phone,
  //                        })
  //   .then(()=>{
  //     ctx.response.status = 200;
  //     ctx.body={ message: "User Registered" }
  //             })
  //   // If any user already exist with the same name or email
  //   .catch((err)=> {
  //     if(err){
  //       ctx.response.status = 400;
  //       ctx.body = {error: err}; 	
  //     }
  //                   })

  //                 })
                
     //  try {
//   const {name,email,password,phone} = ctx.request.body;
//   const hash = await bcrypt.hash(password,10);

//   await db('user').insert({
//     name:name,
//     email:email,
//     password:hash,
//     phone:phone 
//     }).then(()=>{
//     ctx.response.status = 200;
//     ctx.body={message:"Signup Successful"} 
//     })
// // For duplicate entry
// } catch (err) {
//     ctx.response.status = 400;
//     ctx.body = {      message: "User already exist"      };  
// } 