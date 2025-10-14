import {
  auth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "../../../fireBaseConfig.js";
import { loadData } from "../../app.js";
import {
  showConfirmation,
  showSuccess,
  showWarning,
  showError,
} from "../../utils/notification.js";
import { hideSignupForm } from "./signUp.js";

const signinForm = document.getElementById("signin-form");
const taskContainer = document.getElementById("task-container");

signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Проверка email верификации
    if (!user.emailVerified) {
      showWarning("Ваш email не верифицирован. Пожалуйста, проверьте вашу почту.");
      const resend = await showConfirmation("Отправить письмо для верификации повторно?");
      if (resend) {
        await sendEmailVerification(user);
        showSuccess("Письмо для верификации отправлено повторно. Проверьте вашу почту.");
      }
      return;
    }

    showTasksBlock();
    hideSigninForm();
    hideSignupForm();
    loadData();

  } catch (error) {
    console.error("Ошибка авторизации:", error.code, error.message);

    // 🔥 Обработка типовых ошибок Firebase
    switch (error.code) {
      case "auth/invalid-email":
        showError("Неверный формат email.");
        break;
      case "auth/user-not-found":
        showError("Пользователь с таким email не найден.");
        break;
      case "auth/wrong-password":
        showError("Неверный пароль.");
        break;
      case "auth/too-many-requests":
        showError("Слишком много попыток входа. Попробуйте снова через несколько минут.");
        break;
      case "auth/email-already-in-use":
        showError("Этот email уже зарегистрирован.");
        break;
      default:
        showError("Произошла ошибка при входе. Попробуйте позже.");
    }
  }
});

export function showTasksBlock() {
  taskContainer.style.display = "block";
  loadData();
}

export function hideTasksBlock() {
  taskContainer.style.display = "none";
}

export function hideSigninForm() {
  signinForm.style.display = "none";
}
