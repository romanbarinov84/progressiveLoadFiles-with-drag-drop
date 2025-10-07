import { getTodos,toggleTodoStatus,deleteTodo} from "./api/index.js";
import { initDragAndDropListeners,initDeleteCompleted, initAddTodo, updateTask, initDownload } from "./components/index.js";
import { hideLoader, showError, showLoader } from "./utils/helpers.js";


export const container = document.getElementById("posts-container");
export const taskInput = document.getElementById("task-input");
export const addButton = document.getElementById("add-button");
export const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);


export async function loadData() {
  showLoader();
  try {
    const todos = await getTodos();
    renderData(todos);
  } catch (error) {
    console.error("данные не получены", error);

    if (error.message === "Задач нет") {
      showError("Задач нет");
    } else {
      showError("неудалось получить данные");
    }
  } finally {
    hideLoader();
  }
}

function renderData(todos) {
  container.innerHTML = "";

  //находим зделанные задачи
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  deleteCompletedButton.style.display = hasCompletedTodos ? "block" : "none";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    const checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.checked = todo.completed;

    checkBox.addEventListener("change", async () => {
      try {
        await toggleTodoStatus(todo.id, checkBox.checked);
        await loadData();
      } catch (error) {
        console.error("Ошибка изменения статуса");
        showError("неудалось изменить данные");
      }
    });
    const textElement = document.createElement("p");
    textElement.textContent = todo.text;

    const timeElement = document.createElement("p");
    textElement.style.textDecoration = todo.completed ? "line-through" : "none";

    timeElement.textContent = new Date(todo.createdAt).toDateString("ru,RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-function");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/images/deleteButton.png";
    deleteIcon.alt = "удалить";
    deleteIcon.title = "удалить";

    deleteButton.append(deleteIcon);

    deleteButton.addEventListener("click", async () => {
      try {
        await deleteTodo(todo.id);
        await loadData();
      } catch (error) {
        console.error("Ошибка удаления задачи");
        showError("неудалось удалить данные");
      }
    });
    deleteButton.classList.add("button-function");

    const updateButton = document.createElement("button");
    const updateIcon = document.createElement("img");
    updateIcon.src = "assets/images/updateButton.png";
    updateIcon.alt = "обновить";
    updateIcon.title = "обновить";

    updateButton.append(updateIcon);
    updateButton.addEventListener("click",() => {
     
       updateTask(todo);
    });

    todoElement.append(
      textElement,
      timeElement,
      checkBox,
      deleteButton,
      updateButton
    );

    container.append(todoElement);
    initDragAndDropListeners(todoElement, todo,container);
  });
}





initAddTodo();
initDeleteCompleted();
initDownload();


