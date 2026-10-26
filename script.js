const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when page loads
displayTasks();


// Add task
addBtn.addEventListener("click", addTask);


// Also add task when pressing Enter
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push(taskText);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


// Display all tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `
            <span class="task-text">${task}</span>

            <div class="buttons">

                <button class="edit-btn"
                    onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}


// Edit task
function editTask(index) {

    const newTask = prompt("Edit your task:", tasks[index]);

    if (newTask === null) {
        return;
    }

    const updatedTask = newTask.trim();

    if (updatedTask === "") {
        alert("Task cannot be empty.");
        return;
    }

    tasks[index] = updatedTask;

    saveTasks();

    displayTasks();
}


// Delete task
function deleteTask(index) {

    const confirmDelete = confirm("Do you want to delete this task?");

    if (confirmDelete) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();
    }
}


// Save tasks 
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
