import { tasks, addTask, editTask, deleteTask, updateTimeCap, timeCap } from './state.js';
import { validateTask } from './validators.js';
import { renderTable, renderDashboard, announce } from './ui.js';
import { filterTasks } from './search.js';
import { exportJSON, importJSON, saveData } from './storage.js';

// Elements
const form = document.getElementById('task-form');
const searchInput = document.getElementById('search-input');
const searchCase = document.getElementById('search-case');
const capInput = document.getElementById('time-cap');
let currentSort = { key: 'dueDate', asc: true };

// Init
document.addEventListener('DOMContentLoaded', () => {
    capInput.value = timeCap;
    refreshUI();
});

// Refresh Data
function refreshUI() {
    const filtered = filterTasks(tasks, searchInput.value, searchCase.checked);
    // Sort logic
    filtered.sort((a, b) => {
        let valA = a[currentSort.key];
        let valB = b[currentSort.key];
        if (currentSort.key === 'duration') { valA = parseFloat(valA); valB = parseFloat(valB); }
        if (valA < valB) return currentSort.asc ? -1 : 1;
        if (valA > valB) return currentSort.asc ? 1 : -1;
        return 0;
    });
    renderTable(filtered, searchInput.value, searchCase.checked);
    renderDashboard();
}

// Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");
    
    const taskData = {
        title: document.getElementById('title').value,
        dueDate: document.getElementById('dueDate').value,
        duration: document.getElementById('duration').value,
        tag: document.getElementById('tag').value
    };

    const errors = validateTask(taskData);
    if (Object.keys(errors).length > 0) {
        for (const [key, msg] of Object.entries(errors)) {
            document.getElementById(`error-${key}`).textContent = msg;
        }
        announce("Form contains errors. Please fix them.", true);
        return;
    }

    const id = document.getElementById('task-id').value;
    if (id) { editTask(id, taskData); announce("Task updated."); } 
    else { addTask(taskData); announce("Task added."); }
    
    form.reset();
    document.getElementById('task-id').value = "";
    refreshUI();
});

// Table Actions (Delegation)
document.getElementById('tasks-tbody').addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    if (e.target.classList.contains('btn-del')) {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(id); refreshUI(); announce("Task deleted.");
        }
    } else if (e.target.classList.contains('btn-edit')) {
        const task = tasks.find(t => t.id === id);
        document.getElementById('task-id').value = task.id;
        document.getElementById('title').value = task.title;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('duration').value = task.duration;
        document.getElementById('tag').value = task.tag;
        window.scrollTo(0, document.getElementById('planner-heading').offsetTop);
        announce("Editing task.");
    }
});

// Sorting
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const key = e.target.getAttribute('data-sort');
        currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
        currentSort.key = key;
        refreshUI();
        announce(`Sorted by ${key} ${currentSort.asc ? 'ascending' : 'descending'}`);
    });
});

// Live Search
searchInput.addEventListener('input', refreshUI);
searchCase.addEventListener('change', refreshUI);

// Settings (Cap, Export, Import)
capInput.addEventListener('change', (e) => {
    updateTimeCap(e.target.value); refreshUI();
});
document.getElementById('btn-export').addEventListener('click', () => exportJSON(tasks));
document.getElementById('btn-import').addEventListener('change', (e) => {
    if (!e.target.files.length) return;
    importJSON(e.target.files[0], (data, err) => {
        if (err) { alert(err); announce(err, true); }
        else {
            tasks.length = 0; tasks.push(...data); saveData(tasks); refreshUI();
            announce("Data imported successfully.");
        }
        e.target.value = "";
    });
});