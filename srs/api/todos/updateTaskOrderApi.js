import { host } from "../host.js";

export async function updateTaskOrderOnServer(taskId, order) {
  try {
    const response = await fetch(`${host}/${taskId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });

    if (!response.ok) {
      throw new Error(
        `Не удалось обновить порядок задач. Статус: ${response.status}`
      );
    }

    return await response.json(); // можно вернуть ответ сервера
  } catch (error) {
    console.error("Ошибка при обновлении порядка задач:", error);
  }
}
