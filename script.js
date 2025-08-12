let taskButton = document.getElementById("add-task-btn");
let taskList = document.getElementById("list-of-tasks");
let inputArea = document.getElementById("task-description");
let text;

const savedTasksJSON = localStorage.getItem("tasks");

if (savedTasksJSON) {
    const savedTasks = JSON.parse(savedTasksJSON);

    savedTasks.forEach((taskText) => {
        let taskCreated = createTask(taskText);
        taskList.prepend(taskCreated);
    });
};

function createTask(text) {
    let task = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = text;
    task.appendChild(span);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Del";
    task.appendChild(deleteButton);
    let editButton = document.createElement("button");
    editButton.textContent = "Edit"
    task.appendChild(editButton);
    
    
    deleteButton.addEventListener("click", () => {
        task.remove();
        saveTasks();
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
            saveTasks();
        }
    })
    
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    })

    return task
};

taskButton.addEventListener("click", () => {
    text = inputArea.value;
    let newTaskElement = createTask(text);
    taskList.prepend(newTaskElement);
    saveTasks();
    inputArea.value = "";
});

const saveTasks = () => {
    let tasks = [];
    let allTasks = document.querySelectorAll("span");
    allTasks.forEach((task) => {
        tasks.push(task.textContent)
    })

    const task_json = JSON.stringify(tasks);
    localStorage.setItem("tasks", task_json);
};


