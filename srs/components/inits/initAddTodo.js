import { addButton, taskInput } from "../../app.js";
import { addNewTodo } from "../ui/addNewTodo.js";

export function initAddTodo(){
    addButton.addEventListener("click", () => addNewTodo(taskInput));

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTodo(taskInput);
  }
});
}


