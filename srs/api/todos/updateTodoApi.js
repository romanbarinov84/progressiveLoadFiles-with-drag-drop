import { host } from "../host.js";

export async function updateTodo(id, newText) {
  try {
    const response = await fetch(`${host}/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });
    if (!response.ok) {
      throw new Error(`Неудалось добавить текст : status ${response.status}`);
    }

    console.log("Текст задачи добавлен");

    return true;
  } catch (error) {
    console.error("текст не добавлен");
    throw error;
  }
}
