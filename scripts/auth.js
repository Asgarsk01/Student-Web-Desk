// const myModel = document.querySelectorAll('#modal')
 async function signup(e){
    e.preventDefault()
    const email = document.querySelector('#signupEmail')
    const password = document.querySelector('#signupPassword')

    try{
    const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    await result.user.updateProfile({
        displayName: "User"
    })
    await result.user.sendEmailVerification()
    M.toast({html:`welcome ${result.user.email}`,classes:"blue"})
    console.log(result)
    }catch(err){
        console.log(err)
        M.toast({html: err.message})
    }
    email.value=""
    email.password=""
    // M.Modal.getInstance(myModel[1]).close()
 }
 async function login(e){
    e.preventDefault()
    const email = document.querySelector('#loginEmail')
    const password = document.querySelector('#loginPassword')

    try{
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    M.toast({html:`welcome ${result.user.email}`,classes:"blue"})
    window.location.href="/NewTab/newtab.html";    
    console.log("inside login ",result)
    }catch(err){
        console.log(err)
        M.toast({html: err.message})
    }
    email.value=""
    password.value="" 
    // M.Modal.getInstance(myModel[0]).close()
 }

 async function loginWithGoogle(){
    try{
        var provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth()
        .signInWithPopup(provider)
        window.location.href="/NewTab/newtab.html";   
        console.log(result)
  }catch(err){
  console.log(err)
  }
  

 }
//  function auth()
//  {
//     var email = document.getElementById("loginEmail")
//     var password = document.getElementById("signupPassword")
//     if(email== "ramu@gmail.com" && password=="123456"){
//         window.location.assign("home.html");
//         alert("login successfully");
//     }
//     else{
//         alert("Invalid Information");
//         return;
//     }
//  }

// function logout()
// {
//     firebase.auth().signOut()
// }

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//    console.log(user)
//   } else {
//    console.log('signout success')
//    M.toast({html: "signout success"})
//    window.location.href="/public/index.html"; 
//   }
// });