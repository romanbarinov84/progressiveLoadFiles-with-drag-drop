import { changeStatus } from "../../index.js";


  export const checkBox = document.createElement("input");
export function checkBoxElement(todo){
   
    checkBox.type = "checkBox";
    checkBox.checked = todo.completed;
    
    changeStatus(todo,checkBox);
    return checkBox
}