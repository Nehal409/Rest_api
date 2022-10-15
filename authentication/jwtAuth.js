// import two main function from jwt library
// sign to create token and verify to verify token
require("dotenv").config()
const jwt = require("jsonwebtoken");



exports.auth = (ctx,next)=>{

    try{
        const token = ctx.headers.authorization.split(' ');
    
        // use bearer when using jwt in header
        // It means first part of header must be Bearer and second part must be a valid token
        if(token[0]=== 'Bearer' && jwt.verify(token[1],process.env.JWT_SECRET)){
          next()
        }
    }
    catch(err){

        // JWT Error function
        if(err.name === 'JsonWebTokenError'){
            ctx.response.status = 401;// 401 means unauthorized
           
        }else{
            ctx.response.status = 401;
        }

    }   
}




