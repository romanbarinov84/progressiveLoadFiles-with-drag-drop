import { addTodo } from "../../api/index.js";
import { loadData } from "../../app.js";
import { showError } from "../../utils/helpers.js";

 export async function addNewTodo(taskInput) {
  const newTodoText = taskInput.value.trim();

  if (!newTodoText) {
    alert("введите текст задачи");
    return;
  }

  const newTodo = {
    text: newTodoText,
    createdAt: Date.now(),
    completed: false,
  };

  try {
    await addTodo(newTodo);

    console.log("Задача добавленна");
    taskInput.value = "";
    await loadData();
  } catch (error) {
    showError("неудалось добавить задачу");
  }
}