import { updateTaskOrderOnServer } from "../../api/index.js";
import { hideLoader, showLoader } from "../../utils/helpers.js";
import { showError } from "../../utils/notification.js";

//функция сохранения изменений на сервере
  export async function updateTaskOrder(container) {
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

