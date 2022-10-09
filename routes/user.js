const router = require("express").Router();
const mysql2 = require("mysql2");
const db = require("../db/database");

function isValidId(req, res, next) {
  if(!isNaN(req.params.user_id)) return next();
  next(new Error('Invalid ID'));
}

// http://localhost:3000/api/users

//To get all data in the table
router.get('/users', async (req, res) =>{
  try {
    const ids = await db('user').select("*");
    res.status(200).json(ids);
  } catch (err) {
    res.status(500).json({message: "Error getting data", error: err})
  }
  })

  
// To get data with specific id  
router.get('/users/:user_id',  isValidId, async (req, res) =>{
  const {user_id} = req.params;
      try {
          await db('user').where({user_id}).select().then((data)=>{  
           res.status(200).json(data);
        })
      }
         catch (err) {
        res.status(500).json({message: "Error getting data", error: err})    
      }
   });

 

// To post data in the table
  router.post('/users',  async (req, res) =>{

  const postData = req.body;
  try {
    await db('users').insert(postData);
    res.status(200).json(postData);
  } catch (err) {
       res.status(500).json({message: "Error creating new post", error: err})  
  } 
  });




// To delete data from the table with specific id
router.delete('/users/:user_id', isValidId, async (req, res) =>{
  const {user_id} = req.params;
  try {
    const count = await db('user').where({user_id}).del();
    if (!count) {
      res.status(404).json({message: "Record not found"})
    } else 
    {
      res.json({message:"Data successfully deleted"}); 
    }  
  }
     catch (err) {
    res.status(500).send({message: "Error deleting data", error: err})    
  }
});





// To update data
  router.put('/users/:user_id',   isValidId, async (req, res) =>{
    const {user_id} = req.params;
    const changes = req.body;
    try {

      const count = await db('user').where({user_id}).update(changes);
      if (!count) {
        res.status(404).json({message: "Record not found"})
      } 
      else {
        await db('user').select('*').where("user_id",user_id).then((data)=>{
          res.status(201).json({data})
        });
         
      }
    } 
    catch (err) {
      res.status(500).json({message: "Error updating new post", error: err})
    }
  });

 module.exports=router; 


//array
// const vehicle= [
//   { id:1, name:"Civic Reborn", make:"Civic", model:"Reborn", status:"Used",engine_type:"Petrol", engine_capacity:"995cc", transmission:"Manual", Price:"Rs.500000" },
//   { id:2, name:"Corolla Axio", make:"Corolla", model:" Axio", status:"New", engine_type:"Petrol",engine_capacity:"1200cc", transmission:"Automatic", Price:"Rs.2500000" },
//   { id:3, name:"Kia Sorento", make:"Kia", model:"Sorento", status:"New", engine_type:"Petrol",engine_capacity:"1300cc", transmission:"Automatic", Price:"Rs.1200000" } ];





//get all data in the array
// router.get('/getVehicle',  (req, res) =>{
//   res.send(vehicle);
// })




// get data with the specific id in the array
// router.get('/getVehicle/:id',  (req, res) =>{
//   const cars = 
//   vehicle.find(    c=> c.id === parseInt(req.params.id));
//   if (!cars) return res.status(404).send ("The course was not found");
//   res.send(cars); 
//  });



// delete data in the array
// router.delete('/deleteVehicle/:id',  (req, res) =>{
//   //look up the vehicle if not found 404 error
//   const cars = 
//   vehicle.find(    c=> c.id === parseInt(req.params.id));
//   if (!cars) return res.status(404).send ("The course with the given id was not found");
//   //delete course
//   const index = vehicle.indexOf(cars);
//   vehicle.splice(index, 1);
//   //response to client
//   res.send(cars);
// });




//post data with array
  //   const {error} = validateCourse(req.body);
  //   if(error) return  res.status(400).send(error.details[0].message); 
  //  const cars = {id: vehicle.length +1,
  //  name: req.body.name,
  //  make: req.body.make,
  //  model: req.body.model, 
  //  status: req.body.status, 
  //  engine_type: req.body.engine_type, 
  //  engine_capacity: req.body.engine_capacity, 
  //  transmission: req.body.transmission,
  //  Price: req.body.Price  
  // };
  //  vehicle.push(cars);
  //  res.send(cars);





  // To  Put Data in a arrya
    //look up the vehicle if it doesnt exist 404 error
    // const cars = 
    // vehicle.find(    c=> c.id === parseInt(req.params.id));
    //  if (!cars) return res.status(404).send ("The course with the given id was not found");  
    // //validate if invalid 400-bad request
    // const {error} = validateCourse(req.body);
    // if(error)  return res.status(400).send(error.details[0].message);    
   // update course
  //  cars.name =  req.body.name;
  //  cars.make =  req.body.make;
  //  cars.model =  req.body.model;
  //  cars.status =  req.body.status;
  //  cars.engine_type =  req.body.engine_type;
  //  cars.engine_capacity =  req.body.engine_capacity;
  //  cars.transmission =  req.body.transmission;
  //  cars.Price =  req.body.Price; 
  // res.send(cars);
  //  });
 
  




// To validate course
//   function  validateCourse(cars){
  
//     const schema = Joi.object({

//     name: Joi.string().min(3).required(),
//     make: Joi.string().min(3).required(),
//     model: Joi.string().min(3).required(),
//     status: Joi.string().min(3).required(),
//     engine_type: Joi.string().min(3).required(),
//     engine_capacity: Joi.string().min(3).required(),
//     transmission: Joi.string().min(3).required(),
//     Price: Joi.string().min(3).required(), 
//  });
 
//     return schema.validate(cars);
// }



















// Knex queries
// knex.schema.createTable('customer',(table)=>{
//   table.increments('id')
//   table.string('name')
//   table.integer('age')
  
// }).then(()=>console.log("table created"))
// .catch((err)=>{console.log(err); throw err})
// .finally(()=>{
//   knex.destroy
// })


// const data = [
//   {name:"Nehal",age:21},
//   {name:"Ali",age:23},
//   {name:"Kamal",age:14},
//   {name:"Mustufa",age:19},
// ];

// knex('customer').insert(data)
  
// .then(()=>console.log("data inserted"))
// .catch((err)=>{console.log(err); throw err})
// .finally(()=>{
//   knex.destroy
// })

// knex.from('customer').select("*").orderBy("age")
// // .where('age','>','20')
// .then((rows)=>{
//   for (row of rows){
//   console.log(`${row['id']} ${row['name']} ${row['age']}`);

// }
// })
// .catch((err)=>{console.log(err); throw err})
// .finally(()=>{
//   knex.destroy
// })