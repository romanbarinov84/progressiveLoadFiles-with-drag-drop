import { onAuthStateChanged, auth } from "../fireBaseConfig.js";
import { loadData } from "./app.js";
import {
  hideSigninForm,
  hideSignupForm,
  showSigninForm,
  showSignupForm,
  showTasksBlock,
} from "./components/index.js";
import { showWarning } from "./utils/notification.js";

export function initApp() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(!user.emailVerified){
        showWarning("Ваш email не верифицырован. Пожалуйста проверте почту");
        return;
      }
      loadData();
      hideSigninForm();
      
      showTasksBlock();
    } else {
      console.log("пользователь не авторизован");
      showSignupForm();
      
    }
  });
}
