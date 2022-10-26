const db = require("../db/database");

// exports.searchvehicle = async (ctx) =>{
//         const search = ctx.query.params
//         const knexQuery = db('vehicle')
              
//         if(query.make) {
//             //wildcard search any character in table  eg.. ?make = s
//           knexQuery.where('make', 'like', `%${query.make}%`);
//         }
//         if(query.model) {
//           knexQuery.where('model', 'like', `%${query.model}%`);
//         }
//         if(query.model) {
//             knexQuery.where('model', 'like', `%${query.model}%`);
//           }
  
      
// }

// exports.searchvehicle = async (ctx) => {
//     search = ctx.query.search
//     console.log(search)
//     var searchEmployees = db('vehicle').select('*').where(
//         'make' ,'like', '%${search}%')
    // )
    // `SELECT * FROM employees WHERE (employeeNo LIKE '%${search}%' OR name LIKE '%${search}%' OR email LIKE '%${search}%' OR contact LIKE '%${search}%') AND isDeleted='0' `
    // //searchValues = [search,search,search,search]
    // console.log(searchEmployees)
    // db.query(searchEmployees, function (errQuery, resQuery) {
    //     if (errQuery) {
    //         res.send(errQuery)
    //     } else {
    //         res.send(resQuery)
    //     }
    // })
// }