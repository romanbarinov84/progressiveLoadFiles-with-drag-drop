import { host } from "../host.js";

export async function getTodos() {
  try {
    const response = await fetch(host, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`"данные не получены",${response.status}`);
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Задач нет");
    }
    data.sort((a, b) => a.order - b.order);

    console.log("данные получены :", data);

    return data;
  } catch (error) {
    console.error("Ошибка получения данных");
  }
}
