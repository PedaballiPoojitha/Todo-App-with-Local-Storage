let tasks = JSON.parse(localStorage.getItem("proTasks")) || [];

const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("proTasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("priorityInput").value;
    const date = document.getElementById("dateInput").value;

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text,
        priority,
        date,
        completed: false
    });

    saveTasks();
    renderTasks();
    document.getElementById("taskInput").value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const newText = prompt("Edit task:");
    if (!newText) return;

    tasks = tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
    );

    saveTasks();
    renderTasks();
}

function renderTasks() {
    const filter = document.getElementById("filterInput").value;
    const search = document.getElementById("searchInput").value.toLowerCase();

    taskList.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "Active") return !task.completed;
            if (filter === "Completed") return task.completed;
            return true;
        })
        .filter(task => task.text.toLowerCase().includes(search))
        .forEach(task => {

            const li = document.createElement("li");
            li.classList.add(`priority-${task.priority}`);
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <div class="task-top">
                    <span class="task-text">${task.text}</span>
                    <span>${task.date || ""}</span>
                </div>

                <div class="actions">
                    <button onclick="toggleComplete(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;

            taskList.appendChild(li);
        });
}

document.getElementById("searchInput").addEventListener("input", renderTasks);

renderTasks();
