
// JWT auth
        // const token = ctx.headers.authorization.split(' ');
        // // use bearer when using jwt in header
        // // It means first part of header must be Bearer and second part must be a valid token
        // if(token[0]=== 'Bearer' && jwt.verify(token[1],process.env.JWT_SECRET)){
        //   next()
        // }
        // const value = jwt.decode(token)
        // console.log(value);


//  router.post('/posts', verifyToken, (req, res) => {  
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       });
//     }
//   });
// });

// router.post('/login', (req, res) => {
//   // Mock user
//   const user = {
//     id: 1, 
//     username: 'brads',
//     email: 'brad@gmail.com'
//   }

//   jwt.sign({user}, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

// // FORMAT OF TOKEN
// // Authorization: Bearer <access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }

// }




//  function decode(){
  
//   console.log(decode)
//   const value = jwt.decode(token)
//   ctx.body = {      message: value    };  
// }


 


  
















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