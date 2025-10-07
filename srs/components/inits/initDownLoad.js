import { loadData } from "../../app.js";


export function initDownload(){
    const downLoadButton = document.querySelector(".button-download");
    downLoadButton.addEventListener("click", loadData);
}