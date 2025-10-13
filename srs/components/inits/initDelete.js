import { deleteTodo } from "../../api/index.js";
import { loadData } from "../../app.js";
import { showError } from "../../utils/notification.js";


export async function initDelete(todo){

     try {
        await deleteTodo(todo.id);
        await loadData();
      } catch (error) {
        console.error("Ошибка удаления задачи");
        showError("неудалось удалить данные");
      }
}