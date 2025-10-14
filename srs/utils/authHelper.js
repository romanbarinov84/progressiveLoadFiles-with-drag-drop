
import {auth,onAuthStateChanged } from "../../fireBaseConfig.js";

export const getUserInfo = () => {
    return new Promise ((resolve,reject) => {
        onAuthStateChanged(auth,async(user) => {
            if(user){
                try {
                  const token = await user.getIdToken();
                  resolve({uid:user.uid, token,emailVerified:user.emailVerified});  
                } catch (error) {
                    reject(new Error("неудалось получить токен"));
                }
            }else{
                reject(new Error("Пользователь не авторизован"));
            }
        })
    })
}