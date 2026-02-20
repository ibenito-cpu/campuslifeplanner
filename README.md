#  Campus Life Planner

**Live Deployment:** https://ibenito-cpu.github.io/campuslifeplanner/
**Demo Video:** https://www.youtube.com/watch?v=ZsvtXyMHXAI

## Overview
Campus Life Planner is a responsive, accessible, and vanilla HTML/CSS/JS web application designed to help students track tasks, assignments, and events. It features full CRUD capabilities, real-time regex-powered searching, local persistence, and data import/export. 

**Theme Selected:** Campus Life Planner  
**Developer:** Benito Isingizwe

---

## Features
* **Dashboard & Stats:** Live calculations of total tasks, total duration, most used tag, and a dynamic weekly time cap tracker.
* **Responsive Layout:** Mobile-first design that smoothly transitions tables into card-based layouts on smaller screens (`<768px`).
* **Robust Form Validation:** Built-in regex testing to enforce strict data integrity before submission.
* **Regex Search & Highlight:** Real-time search that dynamically compiles user-input regex, safely applies case-insensitivity, and highlights matches using `<mark>`.
* **Data Persistence:** Automatically saves all records to `localStorage`.
* **Import/Export:** Allows users to download their planner as a `.json` file and safely import data back with schema validation.

---

## Regex Catalog

The application uses multiple Regular Expressions to enforce data integrity and power the live search functionality. 

| Field / Feature | Regex Pattern | Description | Pass Example | Fail Example |
| :--- | :--- | :--- | :--- | :--- |
| **Title** | `/^\S+(?: \S+)*$/` | Forbids leading/trailing spaces and prevents consecutive multiple spaces. | `CS101 Final` | ` CS101  Final ` |
| **Duration** | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Ensures valid positive numbers with up to two optional decimal places. | `120` or `45.50` | `-10` or `45.555` |
| **Due Date** | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | Strict `YYYY-MM-DD` date validation formatting. | `2026-10-15` | `10-15-2026` |
| **Tag** | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Allows only letters, single spaces, or single hyphens between words. | `Study-Group` | `Study_Group!` |
| **Advanced** | `/\b(\w+)\s+\1\b/i` | **Back-reference** used to detect and block accidental duplicate words. | `Read Chapter 4` | `Read Read Chapter 4` |
| **Live Search** | `new RegExp(input, 'i')` | Dynamically compiled search allowing users to query data via regex. | `^@tag` | *(Gracefully fails via try/catch)* |

---

## Keyboard Map

This app is fully navigable without a mouse. 

* **`Tab`**: Move forward through interactive elements (links, inputs, buttons).
* **`Shift + Tab`**: Move backward through interactive elements.
* **`Enter`**: Activate buttons, submit forms, or trigger skip links.
* **`Space`**: Toggle the "Case Insensitive" checkbox.
* **`Up/Down Arrows`**: Adjust values inside the numeric inputs (Duration, Cap).

---

## ♿ Accessibility (A11y) Notes
* **Semantic HTML:** Utilizes `<header>`, `<main>`, `<section>`, `<nav>`, and `<form>` landmarks.
* **Focus States:** Every interactive element features a clear, high-contrast `outline` when focused (`*:focus-visible`).
* **Skip Link:** Included an invisible-until-focused "Skip to main content" link for screen readers and keyboard users to bypass the header.
* **ARIA Live Regions:** Uses `<div aria-live="polite" role="status">` to announce stats updates, search results, form errors, and successful data imports to screen readers. Escalates to `aria-live="assertive"` if the user goes over their weekly time limit cap or triggers form errors.
* **Inputs & Labels:** All form inputs are explicitly bound to `<label>` elements via the `for` attribute.

---

## Setup & Testing

### How to Run Locally
1. Clone this repository to your local machine.
2. Open `index.html` in any modern web browser. (No build tools or local server required).
3. Alternatively, visit the live GitHub Pages link at the top of this document.

### How to Run Tests
1. Open the `tests.html` file in your browser.
2. The page executes a lightweight, vanilla JS testing suite that validates the Regular Expressions against various edge cases.
3. Check the on-screen output; tests will display as **Green (Pass)** or **Red (Fail)**.