const db = require("../db/database");


const users = [
    {name:'nehal', car:'corolla'},
    {name:'nehal2', car:'corolla'},
    {name:'nehal3', car:'corolla'},
    {name:'nehal4', car:'corolla'},
    {name:'nehal5', car:'corolla'},
    {name:'nehal6', car:'corolla'},
    {name:'nehal7', car:'corolla'},
    {name:'nehal8', car:'corolla'},
    {name:'nehal9', car:'corolla'},


]


exports.homePage = async (ctx) => {
   const page = parseInt(ctx.query.page)
   const limit = parseInt(ctx.query.limit)
   
   const startIndex = (page - 1)*limit
   const endIndex = page*limit


   // We use this method to tell our user if there is any next or previous page available
   const results = {}//empty object

   // To check if there is next page exist or not
   if(endIndex ){
   // for next page information
   results.next = {
    page:page + 1,
    limit:limit
   }
   }
   // To check if the previous page exist or not
   if(startIndex > 0){
   // for previous page information
   results.previous = {
    page:page - 1,
    limit:limit
   }
                     }
try{

results.results = await db('inventory')
.innerJoin('vehicle', 'vehicle.id', 'inventory.id')
.select('vehicle.name', 'vehicle.Price')
.orderBy("item_id").limit(limit).offset(startIndex)
ctx.response.status = 200;
ctx.body = {results}
}
catch (err) {
    ctx.response.status = 500;
    ctx.body = {      message: err.message       };  
}

    
    

 
}