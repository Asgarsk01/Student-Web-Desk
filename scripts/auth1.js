async function login(e){
    e.preventDefault()
    const email = document.querySelector('#loginEmail')
    const password = document.querySelector('#loginPassword')

    try{
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    M.toast({html:`welcome ${result.user.email}`,classes:"blue"})
    window.location.href="/public/demofaculty.html";    
    console.log("inside login ",result)
    }catch(err){
        console.log(err)
        M.toast({html: err.message})
    }
    email.value=""
    password.value="" 
    // M.Modal.getInstance(myModel[0]).close()
 }