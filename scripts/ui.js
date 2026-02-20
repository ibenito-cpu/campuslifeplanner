import { tasks, getStats, timeCap } from './state.js';
import { compileRegex, highlight } from './search.js';

const ariaLive = document.getElementById('aria-live-region');

export function announce(message, assertive = false) {
    ariaLive.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
    ariaLive.textContent = message;
}

export function renderDashboard() {
    const stats = getStats();
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-duration').textContent = stats.duration.toFixed(1);
    document.getElementById('stat-tag').textContent = stats.topTag;
    
    const capEl = document.getElementById('stat-cap');
    if (stats.duration > timeCap) {
        capEl.textContent = `Over by ${(stats.duration - timeCap).toFixed(1)}m!`;
        capEl.style.color = "var(--error)";
        announce(`Warning: Time cap exceeded by ${stats.duration - timeCap} minutes.`, true);
    } else {
        capEl.textContent = `${(timeCap - stats.duration).toFixed(1)}m remaining`;
        capEl.style.color = "white";
    }
}

export function renderTable(data, query = "", isCaseInsensitive = true) {
    const tbody = document.getElementById('tasks-tbody');
    tbody.innerHTML = '';
    const flags = isCaseInsensitive ? 'i' : '';
    const re = compileRegex(query, flags);

    data.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Title">${highlight(task.title, re)}</td>
            <td data-label="Due Date">${highlight(task.dueDate, re)}</td>
            <td data-label="Duration">${highlight(task.duration.toString(), re)} min</td>
            <td data-label="Tag">${highlight(task.tag, re)}</td>
            <td data-label="Actions">
                <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
                <button class="btn btn-secondary btn-del" style="background:var(--error);color:white;" data-id="${task.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}