import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCM4W8YcYwfJ_rdemKUTkh3D3RhIVC-bXQ",
  authDomain: "todo-app-9739f.firebaseapp.com",
  databaseURL:
    "https://todo-app-9739f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-9739f",
  storageBucket: "todo-app-9739f.firebasestorage.app",
  messagingSenderId: "747569476309",
  appId: "1:747569476309:web:6ffb684e9e392845a5e85c",
  measurementId: "G-22KFKDQQ87",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
