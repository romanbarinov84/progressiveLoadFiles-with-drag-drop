import { updateTaskOrder } from "../../components/index.js";

 
 
 
 // функция перетаскивания
  export function initDragAndDropListeners(todoElement, todo,container) {
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

    updateTaskOrder(container);
  });
}
