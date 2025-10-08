import {auth,createUserWithEmailAndPassword} from "../../../fireBaseConfig.js";


const signupForm = document.getElementById("signup-form")
signupForm.addEventListener("submit",async (event) => {
 event.preventDefault();

 const email = document.getElementById("signup-email").value;
 const password = document.getElementById("signup-password").value;

 try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("Registration has been completed successfully",user.uid);
    alert("Registration has been completed successfully");
    
 } catch (error) {
    console.error("ошибка регистрации",error.message,error.code);
    alert(`ошибка регистрации ${error.message}`)
 }

})

