function logout()
{
    firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   console.log(user)
  } else {
    window.location.href="/public/index.html"; 
   console.log('signout success')
//    window.location.href="/public/index.html"; 
   M.toast({html: "signout success",classes:"green"})
//    window.location.href="/public/index.html"; 
  }
});