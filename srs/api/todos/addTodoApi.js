import { host } from "../host.js";


export async function addTodo(newTodo) {
  try {
    const response = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(
        `Неудалось добавить задачу : Status => ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.log("неудалось добавить задачу");
    throw error;
  }
}
