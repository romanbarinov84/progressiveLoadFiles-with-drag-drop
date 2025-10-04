import { getTodos } from "./api/getTodoApi.js";
import { toggleTodoStatus } from "./api/getStatusTodoApi.js";
import { deleteTodo } from "./api/deleteTodoApi.js";
import { updateTodo } from "./api/updateTodoApi.js";
import { addTodo } from "./api/addTodoApi.js";
import { updateTaskOrderOnServer } from "./api/updateTaskOrderApi.js";
import { deleteCompletedTodos } from "./api/deleteCompletedTodosApi.js";

const container = document.getElementById("posts-container");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const downLoadButton = document.querySelector(".button-download");
const overlay = document.getElementById("overlay");
const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);

export const host = "https://67d67177286fdac89bc1ec9d.mockapi.io/Carts";

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
    deleteIcon.src = "images/deleteButton.png";
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
    updateIcon.src = "images/updateButton.png";
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
    addDragAndDropListeners(todoElement, todo);
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

function showLoader() {
  overlay.style.display = "flex";
}
function hideLoader() {
  overlay.style.display = "none";
}

// функция перетаскивания
function addDragAndDropListeners(todoElement, todo) {
  //элемент который перетаскиваем
  todoElement.draggable = true;
  todoElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", todo.id);
    event.currentTarget.classList.add("dragging");
  });

  //элемент над которым перетаскиваем
  todoElement.addEventListener("dragover", (event) => {
    event.preventDefault();
    //находим элемент который перетаскиваем
    const draggable = document.querySelector(".dragging");
    //находим элемент над которым перетаскиваемый элемент
    const overElement = event.currentTarget;

    if (overElement !== draggable) {
      const rect = overElement.getBoundingClientRect();
      const offSet = event.clientY - rect.top;

      if (offSet < rect.height / 2) {
        container.insertBefore(draggable, overElement);
      } else {
        container.insertBefore(draggable, overElement.nextSibling);
      }
    }
  });

  //убираем стили после перетаскивания
  todoElement.addEventListener("dragend", (event) => {
    event.currentTarget.classList.remove("dragging");

    updateTaskOrder();
  });
}

//функция сохранения изменений на сервере
async function updateTaskOrder() {
  const todos = [...container.querySelectorAll(".todo")];
  const updatedOrder = todos.map((todo, index) => {
    return {
      id: todo.getAttribute("data-id"),
      order: index + 1,
    };
  });

  try {
    showLoader();
    for (const task of updatedOrder) {
      await updateTaskOrderOnServer(task.id, task.order);
    }
    console.log("Порядок задач обновлен");

    return true;
  } catch (error) {
    console.error(error.message);
    showError("неудалось обновить порядок задач");
  } finally {
    hideLoader();
  }
}

function showError(message) {
  const icon = message === "Задач нет" ? "info" : "error";
  const title = message === "Задач нет" ? "информация" : "Ощибка";
  Swal.fire({
    title,
    text: message,
    icon,
    showConfirmButton: true,
  });
}
