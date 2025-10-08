
import { auth, signInWithEmailAndPassword } from "../../../fireBaseConfig.js";


const signinForm = document.getElementById("signin-form")
signinForm.addEventListener("submit",async (event) => {
 event.preventDefault();

 const email = document.getElementById("signin-email").value;
 const password = document.getElementById("signin-password").value;

 try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("Autorization has been completed successfully",user.uid);
    alert("Autorization has been completed successfully");
    
 } catch (error) {
    console.error("ошибка авторизации",error.message,error.code);
    alert(`ошибка авторизации ${error.message}`)
 }

})

