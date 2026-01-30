const API_URL = "http://localhost:5000/api/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <b>${task.title}</b> - ${task.description} 
            <span>[${task.status}]</span>
            <br>
            <button onclick="editTask('${task._id}', '${task.title}', '${task.description}', '${task.status}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function saveTask() {
    const id = document.getElementById("taskId").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    const taskData = { title, description, status };

    if (id) {
        // UPDATE
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });
    }

    clearForm();
    fetchTasks();
}

function editTask(id, title, description, status) {
    document.getElementById("taskId").value = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("status").value = status;
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    fetchTasks();
}

function clearForm() {
    document.getElementById("taskId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "Pending";
}

fetchTasks();
