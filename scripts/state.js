import { loadData, saveData } from './storage.js';

export let tasks = loadData();
export let timeCap = parseInt(localStorage.getItem('campus_time_cap')) || 1200;

export const updateTimeCap = (val) => { timeCap = val; localStorage.setItem('campus_time_cap', val); };

export const addTask = (task) => {
    task.id = "rec_" + Date.now();
    task.createdAt = new Date().toISOString();
    task.updatedAt = task.createdAt;
    tasks.push(task);
    saveData(tasks);
};

export const editTask = (id, updatedTask) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index > -1) {
        tasks[index] = { ...tasks[index], ...updatedTask, updatedAt: new Date().toISOString() };
        saveData(tasks);
    }
};

export const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveData(tasks);
};

export const getStats = () => {
    const total = tasks.length;
    const duration = tasks.reduce((sum, t) => sum + parseFloat(t.duration), 0);
    const tags = tasks.reduce((acc, t) => { acc[t.tag] = (acc[t.tag] || 0) + 1; return acc; }, {});
    const topTag = Object.keys(tags).sort((a,b) => tags[b] - tags[a])[0] || "None";
    return { total, duration, topTag };
};