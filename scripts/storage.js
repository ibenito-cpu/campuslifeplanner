const KEY = 'campus_planner_data';

export const loadData = () => JSON.parse(localStorage.getItem(KEY) || '[]');
export const saveData = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const exportJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "planner_backup.json";
    a.click();
    URL.revokeObjectURL(url);
};

export const importJSON = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if(Array.isArray(data) && data.every(d => d.id && d.title)) {
                callback(data, null);
            } else throw new Error("Invalid schema");
        } catch (err) {
            callback(null, "Failed to parse valid JSON.");
        }
    };
    reader.readAsText(file);
};