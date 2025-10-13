import { toggleTodoStatus } from "../../api/index.js";
import { loadData } from "../../app.js";
import { showError } from "../../utils/notification.js";


export function changeStatus(todo,checkBox){
      checkBox.addEventListener("change", async () => {
      try {
        await toggleTodoStatus(todo.id, checkBox.checked);
        await loadData();
      } catch (error) {
        console.error("Ошибка изменения статуса");
        showError("неудалось изменить данные");
      }
    });
}