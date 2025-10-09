import { host } from "../host.js";
import { getUserInfo } from "../../utils/authHelper.js";

export async function addTodo(newTodo) {
  try {
    const {uid,token} = await getUserInfo();
    const response = await fetch(`${host}/${uid}.json?auth=${token}`, {
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
