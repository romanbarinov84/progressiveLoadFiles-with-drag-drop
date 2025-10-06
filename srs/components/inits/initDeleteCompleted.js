import { deleteCompletedTodos } from "../../api/index.js";
import { container, deleteCompletedButton, loadData } from "../../app.js";
import { showError } from "../../utils/helpers.js";

export function initDeleteCompleted() {
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
}
