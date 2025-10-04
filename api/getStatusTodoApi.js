import { host } from "../main.js";




 export  async function toggleTodoStatus(id, completed) {
  try {
    const response = await fetch(`${host}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error(`Неудалось изменить : status ${response.status}`);
    }

    console.log("Задача изменена");

    return true
  } catch (error) {
    console.error("статус задачи необновлен");
    throw Error
  }
}