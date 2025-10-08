import { host } from "../host.js";

export async function deleteTodo(id) {
  try {
    const response = await fetch(`${host}/${id}.json`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Неудалось удалить : status ${response.status}`);
    }

    console.log("Задача удалена");

    return true;
  } catch (error) {
    console.error("Неудалось удалить задачу", error.message);
    throw error;
  }
}
