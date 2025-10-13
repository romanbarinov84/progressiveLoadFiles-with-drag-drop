import { auth, signOut } from "../../../fireBaseConfig.js";
import { hideSignupForm,  hideTasksBlock,  showSigninForm } from "../index.js";


document.getElementById("logOut-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    hideSignupForm();
    showSigninForm();
    hideTasksBlock();
    
  } catch (error) {
    console.error("ошибка при выходе из системы", error);
  }
});
