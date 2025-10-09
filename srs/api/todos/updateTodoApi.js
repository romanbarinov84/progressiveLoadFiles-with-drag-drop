import { host } from "../host.js";
import { getUserInfo } from "../../utils/authHelper.js";

export async function updateTodo(id, newText) {
  try {
    const {uid,token} = await getUserInfo();
    const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
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
