import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../../../fireBaseConfig.js";
import { showError } from "../../utils/notification.js";
import { showSuccess } from "../../utils/notification.js";

const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const signInButton = document.getElementById("signIn");

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  signupForm.style.display = "none";
  signinForm.style.display = "block";
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await sendEmailVerification(user);

    console.log("Registration has been completed successfully", user.uid);
    showSuccess("Registration has been completed successfully");

    showSigninForm();
    hideSignupForm();
  } catch (error) {
    console.error("ошибка регистрации", error.message, error.code);
    showError("ошибка регистрации");
  }
});

export function hideSignupForm() {
  signupForm.style.display = "none";
}
export function showSigninForm() {
  signinForm.style.display = "block";
}
export function showSignupForm() {
  signinForm.style.display = "block";
}
