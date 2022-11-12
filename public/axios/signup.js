






















// const form = document.getElementById('form');
// form.addEventListener('submit',
// function(e){
//     e.preventDefault();

//     const formData = new FormData(form);

//     console.log([...formData]);
// }
// )




// const signup = function addText(){
//   const email = document.querySelector('#email').value;
//   const password = document.querySelector('#pass').value;
//   const phone = document.querySelector('#phone').value;
//   const name = document.querySelector('#name').value;

//   let user = {email:email, password:password, phone:phone, name:name}
//   axios.post("http://localhost:3000/users/signup",user );
// }


// const btn = document.querySelector('button');
// btn.addEventListener('click',addText)


// axios.post("http://localhost:3000/users/signup", {
//     data: {
//         username: usernameReg, 
//         email:emailReg, 
//         password: passwordReg
//     }
// }).then((response) => {
//         console.log(response)
// }).catch(err => console.log(err))











// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("pass");
// const phoneInput = document.getElementById("phone");
// const nameInput = document.getElementById("name");
// const btn = document.getElementById("btn");

// btn.addEventListener("click", () => {
//   const email = emailInput.value;
//   const password = passwordInput.value;
//   const phone = phoneInput.value;
//   const name = nameInput.value;


//   axios.post('http://localhost:3000/users/signup', {
//       email: email,
//       password: password,
//       phone:phone,
//       name:name
//     })
//     .then((response) => {
//       console.log(response);
//     });
// });



// const createUser = user => {
//     axios
//       .post('http://localhost:3000/users/signup', user)
//       .then(response => {
//         const addedUser = response.data
//         console.log(`POST: user is added`, addedUser)
//         // append to DOM
//         appendToDOM([addedUser])
//       })
//       .catch(error => console.error(error))
//   }

