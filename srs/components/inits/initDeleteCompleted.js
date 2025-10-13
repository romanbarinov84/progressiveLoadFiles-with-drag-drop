import { deleteCompletedTodos } from "../../api/index.js";
import { container, deleteCompletedButton, loadData } from "../../app.js";
import { showError } from "../../utils/notification.js";
import { showConfirmation } from "../../utils/notification.js";

export function initDeleteCompleted() {
  deleteCompletedButton.addEventListener("click", async () => {
    const isConfirmed = await showConfirmation("все выполненные задачи будут удалены!Вы уверенны?")
    

    if (!isConfirmed) {
      return;
    } else {
      try {
        await deleteCompletedTodos(container);
        await loadData();
      } catch (error) {
        console.error(error.message);
        showError("неудалось удалить  задачу");
      }
    }
  });
}
