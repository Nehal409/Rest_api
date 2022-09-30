const router = require("express").Router();
const Joi = require('joi');





const vehicle= [
   { id:1, name:"Civic Reborn", make:"Civic", model:"Reborn", status:"Used",engine_type:"Petrol", engine_capacity:"995cc", transmission:"Manual", Price:"Rs.500000" },
   { id:2, name:"Corolla Axio", make:"Corolla", model:" Axio", status:"New", engine_type:"Petrol",engine_capacity:"1200cc", transmission:"Automatic", Price:"Rs.2500000" },
   { id:3, name:"Kia Sorento", make:"Kia", model:"Sorento", status:"New", engine_type:"Petrol",engine_capacity:"1300cc", transmission:"Automatic", Price:"Rs.1200000" }

];


// http://localhost:3000/api/vehicle/getVehicle
router.get('/getVehicle',  (req, res) =>{
    res.send(vehicle);
  })
  
  router.get('/getVehicle/:id',  (req, res) =>{
    const cars = 
    vehicle.find(    c=> c.id === parseInt(req.params.id));
    if (!cars) return res.status(404).send ("The course was not found");
    res.send(cars);
    
   });
   

// http://localhost:3000/api/vehicle/postVehicle  
  router.post('/postVehicle',  (req, res) =>{
    const {error} = validateCourse(req.body);
    if(error) return  res.status(400).send(error.details[0].message); 
   const cars = {id: vehicle.length +1,
   name: req.body.name, make: req.body.make, model: req.body.model, status: req.body.status, 
   engine_type: req.body.engine_type, engine_capacity: req.body.engine_capacity, transmission: req.body.transmission,
    Price: req.body.Price  }; 
   vehicle.push(cars);
   res.send(cars);
  });
  
 
// http://localhost:3000/api/vehicle/updateVehicle 
  router.put('/updateVehicle/:id',  (req, res) =>{
    //look up the vehicle if it doesnt exist 404 error
    const cars = 
    vehicle.find(    c=> c.id === parseInt(req.params.id));
     if (!cars) return res.status(404).send ("The course with the given id was not found");
   
    //validate if invalid 400-bad request
    const {error} = validateCourse(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
      
   // update course
   cars.name =  req.body.name;
   cars.make =  req.body.make;
   cars.model =  req.body.model;
   cars.status =  req.body.status;
   cars.engine_type =  req.body.engine_type;
   cars.engine_capacity =  req.body.engine_capacity;
   cars.transmission =  req.body.transmission;
   cars.Price =  req.body.Price;
  
  res.send(cars);
   });
  
  

// http://localhost:3000/api/vehicle/deleteVehicle  
   router.delete('/deleteVehicle/:id',  (req, res) =>{
       //look up the vehicle if not found 404 error
       const cars = 
       vehicle.find(    c=> c.id === parseInt(req.params.id));
       if (!cars) return res.status(404).send ("The course with the given id was not found");
  
       //delete course
       const index = vehicle.indexOf(cars);
       vehicle.splice(index, 1);
  
       //response to client
       res.send(cars);
  });
  
  
   function  validateCourse(cars){
  
       const schema = Joi.object({
  
       name: Joi.string().min(3).required(),
       make: Joi.string().min(3).required(),
       model: Joi.string().min(3).required(),
       status: Joi.string().min(3).required(),
       engine_type: Joi.string().min(3).required(),
       engine_capacity: Joi.string().min(3).required(),
       transmission: Joi.string().min(3).required(),
       Price: Joi.string().min(3).required(), 
    });
    
       return schema.validate(cars);
   }

   module.exports=router; 