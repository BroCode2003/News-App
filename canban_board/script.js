// script.js
document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task-input');
    const taskText = taskInput.value.trim();

    if (taskText) {
        createTaskElement(taskText, 'todo');
        taskInput.value = '';
        saveTasks();
    }
}

function createTaskElement(text, columnId) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.innerHTML = `${text} <button onclick="removeTask(this)">✖</button>`;
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    document.getElementById(columnId).appendChild(task);
}

function removeTask(button) {
    const task = button.parentElement;
    task.remove();
    saveTasks();
}

const columns = document.querySelectorAll('.column');

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', dragDrop);
});

let draggedTask = null;

function dragStart(e) {
    draggedTask = e.target;
    setTimeout(() => e.target.classList.add('hide'), 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
    draggedTask = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        e.target.classList.add('over');
    }
}

function dragLeave(e) {
    if (e.target.classList.contains('column')) {
        e.target.classList.remove('over');
    }
}

function dragDrop(e) {
    if (e.target.classList.contains('column')) {
        e.target.classList.remove('over');
        e.target.appendChild(draggedTask);
        saveTasks();
    }
}

function saveTasks() {
    const tasks = { todo: [], 'in-progress': [], done: [] };

    columns.forEach(column => {
        const columnTasks = Array.from(column.querySelectorAll('.task'));
        tasks[column.id] = columnTasks.map(task => task.textContent.trim().slice(0, -1)); // Remove '✖'
    });

    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('kanbanTasks'));
    if (tasks) {
        for (const columnId in tasks) {
            tasks[columnId].forEach(taskText => createTaskElement(taskText, columnId));
        }
    }
}
