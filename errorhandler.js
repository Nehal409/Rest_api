const Koa = require("koa");


function errorHandler(Error,ctx,next){
         ctx.status = 500;
         ctx.body = {      message: Error.message       }; 
}

module.exports = errorHandler