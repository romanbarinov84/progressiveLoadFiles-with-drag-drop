
import { host } from "../main.js";

export async function deleteCompletedTodos(container) {
    
    try {
        const completedTodos =Array.from(container.querySelectorAll(".todo"))
        .filter((todoElement) => {
            const checkbox = todoElement.querySelector('input[type="checkbox"]');
            return checkbox.checked;
        });

        for(const todoElement of completedTodos){
            const taskId = todoElement.getAttribute("data-id");

            const deleteResponse = await fetch(`${host}/${taskId}`, {
                method:"DELETE",
            });
            if(!deleteResponse.ok){
                throw new Error(`не удалось удалить список задач.Статус: ${deleteResponse.status}`)
            }
        }
        return true;
    } catch (error) {
        console.error("ошибка удаления выполненых задач :",error.message);
        throw error;
    }
}