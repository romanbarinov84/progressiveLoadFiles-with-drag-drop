import {auth,createUserWithEmailAndPassword} from "../../../fireBaseConfig.js";


const signupForm = document.getElementById("signup-form")
const signinForm = document.getElementById("signin-form");
const signInButton = document.getElementById("signIn");

signInButton.addEventListener("click", (event) => {
   event.preventDefault();
    signupForm.style.display = "none";
    signinForm.style.display = "block";
})


signupForm.addEventListener("submit",async (event) => {
 event.preventDefault();

 const email = document.getElementById("signup-email").value;
 const password = document.getElementById("signup-password").value;

 try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("Registration has been completed successfully",user.uid);
    alert("Registration has been completed successfully");
     
    showSigninForm();
    hideSignupForm();
   
 } catch (error) {
    console.error("ошибка регистрации",error.message,error.code);
    alert(`ошибка регистрации ${error.message}`)
 }

})

function hideSignupForm(){
    signupForm.style.display = "none";
}
function showSigninForm(){
    signinForm.style.display = "block";
}
