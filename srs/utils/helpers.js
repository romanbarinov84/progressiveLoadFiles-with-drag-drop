 
 
 export  function showError(message) {
  const icon = message === "Задач нет" ? "info" : "error";
  const title = message === "Задач нет" ? "информация" : "Ощибка";
  Swal.fire({
    title,
    text: message,
    icon,
    showConfirmButton: true,
  });
}


const overlay = document.getElementById("overlay");
 export function showLoader() {
  overlay.style.display = "flex";
}
 export function hideLoader() {
  overlay.style.display = "none";
}
