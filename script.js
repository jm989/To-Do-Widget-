let taskButton = document.getElementById("add-task-btn");
let taskList = document.getElementById("list-of-tasks");
let inputArea = document.getElementById("task-description");
let text;

let tasks = [];

taskButton.addEventListener("click", () => {
    text = inputArea.value;
    let task = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = text;
    task.appendChild(span);
    tasks.push(span.textContent);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Del";
    task.appendChild(deleteButton);
    let editButton = document.createElement("button");
    editButton.textContent = "Edit"
    task.appendChild(editButton);

    taskList.prepend(task);
    inputArea.value = "";

    deleteButton.addEventListener("click", () => {
        task.remove();
    });
    
    editButton.addEventListener("click", () => {
        if(editButton.textContent == "Edit") {
            let new_input = document.createElement("input");
            new_input.value = span.textContent;
            task.replaceChild(new_input, span);
    
            editButton.textContent = "Save";
        }else {
            let currentInput = task.querySelector("input");
            span.textContent = currentInput.value;
            task.replaceChild(span, currentInput);
            editButton.textContent = "Edit"
        }
    })

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    })
});


