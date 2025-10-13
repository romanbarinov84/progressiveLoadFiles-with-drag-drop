
import { auth, signInWithEmailAndPassword } from "../../../fireBaseConfig.js";
import { loadData } from "../../app.js";


const signinForm = document.getElementById("signin-form")
const taskContainer = document.getElementById("task-container");

signinForm.addEventListener("submit",async (event) => {
 event.preventDefault();

 const email = document.getElementById("signin-email").value;
 const password = document.getElementById("signin-password").value;

 try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("Autorization has been completed successfully",user.uid);
    alert("Autorization has been completed successfully");
    showTasksBlock();
    hideSigninForm();
 } catch (error) {
    console.error("ошибка авторизации",error.message,error.code);
    alert(`ошибка авторизации ${error.message}`)
 }

})

 export function showTasksBlock(){
   taskContainer.style.display = "block"
   loadData()
}
 export function hideTasksBlock(){
   taskContainer.style.display = "none"
  
}

 export function hideSigninForm(){
    signinForm.style.display = "none";
}