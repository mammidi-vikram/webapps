document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("task-input");
  const addBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = task.text;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit your task:", task.text);
        if (newText && newText.trim() !== "") {
          task.text = newText.trim();
          saveTasks();
          renderTasks();
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      };

      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "task-buttons";
      buttonsDiv.append(editBtn, deleteBtn);

      li.append(checkbox, span, buttonsDiv);
      taskList.appendChild(li);
    });
  }

  addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) {
      alert("Task cannot be empty.");
      return;
    }
    tasks.push({ text, completed: false });
    saveTasks();
    input.value = "";
    renderTasks();
  });

  renderTasks();
});
