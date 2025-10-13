import { host } from "../host.js";

export async function getTodos(uid,token) {
  try {
    const response = await fetch(`${host}/${uid}.json?auth=${token}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`"данные не получены",${response.status}`);
    }

    const data = await response.json();
    console.log("данные получены");

    if (!data) {
      return []
    }

    const todosArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    todosArray.sort((a, b) => a.order - b.order);

    console.log("данные получены :", data);

    console.log(todosArray);

    return todosArray;
  } catch (error) {
    console.error("Ошибка получения данных");
  }
}
