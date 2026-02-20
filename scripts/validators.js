// 1. Title: Forbid leading/trailing spaces, collapse doubles
export const rxTitle = /^\S+(?: \S+)*$/;
// 2. Numeric Duration: positive numbers with optional two decimals
export const rxDuration = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
// 3. Date format YYYY-MM-DD
export const rxDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
// 4. Category/Tag: letters, spaces, hyphens
export const rxTag = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
// 5. Advanced: Back-reference to catch duplicate words (e.g., "Study Study")
export const rxDuplicate = /\b(\w+)\s+\1\b/i;

export function validateTask(task) {
    const errors = {};
    if (!rxTitle.test(task.title)) errors.title = "Invalid title format. No leading/trailing spaces.";
    if (rxDuplicate.test(task.title)) errors.title = "Title contains duplicate words.";
    if (!rxDate.test(task.dueDate)) errors.dueDate = "Invalid date (YYYY-MM-DD).";
    if (!rxDuration.test(task.duration)) errors.duration = "Invalid duration.";
    if (!rxTag.test(task.tag)) errors.tag = "Tags can only contain letters, spaces, or hyphens.";
    return errors;
}