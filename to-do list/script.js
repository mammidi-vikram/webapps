// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const deleteCompletedBtnContainer = document.getElementById('deleteCompletedBtnContainer');
const deleteCompletedBtn = document.getElementById('deleteCompletedBtn');

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    }).forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg fade-in ${task.completed ? 'completed' : ''}`;
        const priorityColor = {
            high: 'bg-red-100 text-red-700',
            medium: 'bg-yellow-100 text-yellow-700',
            low: 'bg-green-100 text-green-700'
        }[task.priority];
        li.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <input
                    type="checkbox"
                    class="task-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    ${task.completed ? 'checked' : ''}
                />
                <div class="flex-1">
                    <span class="task-text text-base">${task.text}</span>
                    <div class="text-sm text-gray-500">
                        ${task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : ''}
                        <span class="ml-2 inline-block px-2 py-1 rounded ${priorityColor}">
                            ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 mt-2 sm:mt-0">
                <button
                    class="edit-btn text-blue-600 hover:text-blue-800 text-sm"
                >
                    Edit
                </button>
                <button
                    class="delete-btn text-red-600 hover:text-red-800 text-sm"
                >
                    Delete
                </button>
            </div>
        `;
        // Add event listeners for checkbox, edit, and delete buttons
        const checkbox = li.querySelector('.task-checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        checkbox.addEventListener('change', () => toggleTask(index));
        editBtn.addEventListener('click', () => editTask(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));
        taskList.appendChild(li);
    });
    // Show/hide Delete Completed button
    deleteCompletedBtnContainer.classList[tasks.some(task => task.completed) ? 'remove' : 'add']('hidden');
}

// Add task
function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        errorMsg.classList.remove('hidden');
        taskInput.classList.add('error-shake', 'border-red-500');
        setTimeout(() => {
            taskInput.classList.remove('error-shake', 'border-red-500');
            errorMsg.classList.add('hidden');
        }, 1000);
        return;
    }
    tasks.push({
        text,
        completed: false,
        priority: priorityInput.value,
        dueDate: dueDateInput.value || null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
    renderTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim()) {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    } else if (newText !== null && !newText.trim()) {
        alert('Task description cannot be empty!');
    }
}

// Delete individual task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Delete all completed tasks
function deleteCompletedTasks() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);

// Initial render
renderTasks();
