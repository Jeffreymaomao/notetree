function createAddInputButton() {
  const addInput = document.createElement("input");
  addInput.classList.add("adding-input");
  addInput.type = "text";
  addInput.placeholder = "new folder";

  return addInput;
}

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 格式為 "YYYY-MM-DD HH:mm:ss"
  const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}


function findPreviousElementSiblingWithClass(element, className) {
  let previousSibling = element.previousElementSibling;
  console.log(previousSibling)

  while (previousSibling) {
    if (previousSibling.classList.contains(className)) {
      return previousSibling;
    }

    previousSibling = previousSibling.previousElementSibling;
  }
  return null;
}


export {getCurrentTime, createAddInputButton, findPreviousElementSiblingWithClass};