
const dropFileZone = document.querySelector(".upload-zone__dragover");
const uploadInput = document.getElementById("upload-form__file");
const fileInfoElement = document.getElementById("file-info");
const filesListElement = document.getElementById("file-list");
const filesSentElement = document.getElementById("files-sent");
const submitButton = document.querySelector(".form-upload__submit");

["dragover","drop"].forEach((event) => {
  document.addEventListener(event , (e) => {
    e.preventDefault();
  })
})

dropFileZone.addEventListener("dragenter",() => {
  dropFileZone.classList.add("active");
})
dropFileZone.addEventListener("dragleave",() => {
  dropFileZone.classList.remove("active");
})

dropFileZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropFileZone.classList.remove("active");
  const files = e.dataTransfer.files
  if(files.length > 0) {
     saveFilesToInput(files)
     displayFilesInfo(files)
  }
 
}) 

function saveFilesToInput(files){
   const allFiles = Array.from(uploadInput.files);
   allFiles.push(...files)

   const tempInput = new DataTransfer();
   allFiles.forEach((file) =>  tempInput.items.add(file))
   uploadInput.files = tempInput.files
   
   
  }

  uploadInput.addEventListener("change",() => {
    const files = uploadInput.files;
    if(files.length > 0){
      displayFilesInfo(files)
    }
   
    
  })

  function displayFilesInfo(files) {
    fileInfoElement.style.display = "block"
    submitButton.style.display = "block"

    for(const file of files){
      const listItem = document.createElement("li")
      listItem.innerHTML = `<span>Загружен файл : ${file.name}</span> <br>
       <span>размером : ${file.size}</span>`
       filesListElement.append(listItem)
    }
  }

  submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    const files = uploadInput.files;
    filesSentElement.style.display = "block";
    submitButton.style.display = "none";
    fileInfoElement.style.display = "none"
    const filesInfo = Array.from(files).map((file) => ({
      name:file.name,
      size:file.size,
      type:file.type,
    }));

    console.log(filesInfo);
    
  })