export function compileRegex(input, flags='i') {
    try { return input ? new RegExp(input, flags) : null; } 
    catch { return null; }
}

export function highlight(text, re) {
    if (!re) return text;
    // Prevent highlight breaking HTML, ensure safe text escaping first if needed
    return text.toString().replace(re, m => `<mark>${m}</mark>`);
}

export function filterTasks(tasks, query, isCaseInsensitive) {
    if (!query) return tasks;
    const flags = isCaseInsensitive ? 'i' : '';
    const re = compileRegex(query, flags);
    if (!re) return tasks; 

    return tasks.filter(t => 
        re.test(t.title) || re.test(t.tag) || re.test(t.dueDate) || re.test(t.duration)
    );
}