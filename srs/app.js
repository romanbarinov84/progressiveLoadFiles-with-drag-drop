import { getTodos,toggleTodoStatus,deleteTodo,updateTodo,deleteCompletedTodos,addTodo} from "./api/index.js";
import { initDragAndDropListeners } from "./components/index.js";
import { hideLoader, showError, showLoader } from "./utils/helpers.js";


 export const container = document.getElementById("posts-container");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const downLoadButton = document.querySelector(".button-download");
const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);


async function loadData() {
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
    updateButton.addEventListener("click", async () => {
      const { value: newText } = await Swal.fire({
        title: "Редактирование задачи",
        input: "text",
        inputLabel: "Введите текст новой задачи",
        inputValue: todo.text,
        showCancelButton: true,
        confirmButtonText: "Сохранить",
        cancelButtonText: "Отмена",
        inputValidator: (value) => {
          if (!value) {
            return "Поле не может быть пустым";
          }
        },
      });

      if (newText) {
        try {
          await updateTodo(todo.id, newText);
          await loadData();
        } catch (error) {
          showError("неудалось обновить задачу");
        }
      }
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

async function addNewTodo() {
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
    console.log("неудалось добавить задачу");
  }
}

addButton.addEventListener("click", addNewTodo);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTodo();
  }
});

downLoadButton.addEventListener("click", loadData);

deleteCompletedButton.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "Вы уверенны?",
    text: "Все выполненые задачи будут удаленны!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Да удалить!",
    cancelButtonText: "No, cancel!",
  });

  if (!result.isConfirmed) {
    return;
  } else {
    try {
      await deleteCompletedTodos(container);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("неудалось удалить задачу");
    }
  }
});




