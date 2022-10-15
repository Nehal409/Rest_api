const db = require("./database");

module.exports = {
    getAllvehicle(query) {
        const knexQuery = db('vehicle');
    
        if(query.make) {
            //wildcard search any character in table  eg.. ?make = s
          knexQuery.where('make', 'like', `%${query.make}%`);
        }
        if(query.model) {
          knexQuery.where('model', 'like', `%${query.model}%`);
        }
  
        return knexQuery;
}




}