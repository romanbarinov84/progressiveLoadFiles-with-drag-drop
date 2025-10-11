import { onAuthStateChanged,auth } from "../fireBaseConfig.js";
import { loadData } from "./app.js";
import {  hideSigninForm, hideSignupForm, showSigninForm, showSignupForm, showTasksBlock } from "./components/index.js";



 export function initApp(){
    
    onAuthStateChanged(auth,(user) => {
        if(user){
            
            loadData()
            hideSigninForm();
            hideSignupForm();
            showTasksBlock();
            
        }else{
            console.log("пользователь не авторизован");
            showSignupForm();
            showSigninForm();
        }
    })
}
