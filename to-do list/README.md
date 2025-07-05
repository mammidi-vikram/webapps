# To-Do List Application Guide

## Welcome to the To-Do List App
The To-Do List Application is a modern, user-friendly web app built with HTML, CSS, and vanilla JavaScript, designed to help you manage tasks efficiently. With a sleek, professional interface, it’s optimized for mobile, tablet, and desktop devices, offering a seamless experience for organizing your tasks. Whether you’re tracking daily chores or prioritizing important projects, this app provides intuitive features like task creation, editing, completion tracking, prioritization, due dates, and bulk deletion of completed tasks, all with data persistence using browser local storage.

## Features
- **Task Management**: Easily add tasks with a description, priority (low, medium, high), and optional due date. Edit or delete individual tasks with simple clicks, and mark tasks as complete using checkboxes.
- **Task Visibility**: Newly added tasks appear instantly in the list with a smooth fade-in animation. The scrollable task list ensures all tasks are accessible, with a styled scrollbar for a polished look.
- **Completion Handling**: Mark tasks as completed, which applies a strikethrough and faded effect for clear distinction. A "Delete Completed Tasks" button lets you remove all completed tasks at once with a confirmation prompt.
- **Prioritization**: Assign high, medium, or low priority to tasks, displayed with color-coded badges (red, yellow, green). Tasks are automatically sorted by priority, with high-priority tasks at the top.
- **Due Dates**: Set optional due dates using a date picker, shown in a localized format alongside each task.
- **Validation**: Prevents adding or editing tasks with empty descriptions, providing clear feedback with a shake animation and error message.
- **Data Persistence**: Tasks are saved in the browser’s local storage, ensuring they remain even after refreshing the page.
- **Responsive Design**: The app adapts beautifully to any screen size, from mobile phones to desktops, with a clean, card-based layout and flexible input forms.
- **Polished Interface**: Features smooth animations, hover effects, and accessibility support (keyboard navigation, focus states) for an intuitive and professional experience.

## How to Run the App
Follow these steps to get the To-Do List Application up and running, either locally or in an online compiler.

### Local Setup
1. **Download the Files**:
   - Unzip the project folder containing `index.html`, `styles.css`, `script.js`, and `README.md`.
2. **Open the App**:
   - Double-click `index.html` to open it in a modern web browser (e.g., Chrome, Firefox, Safari).
   - No server or additional setup is needed, as the app runs entirely in the browser.
3. **Start Using the App**:
   - Enter a task description, select a priority, and optionally set a due date.
   - Click "Add Task" or press Enter to add the task.
   - Use checkboxes to mark tasks as complete, edit or delete tasks via buttons, or clear all completed tasks with the "Delete Completed Tasks" button.

### Online Compiler Setup
To test the app in an online environment, use a compiler like CodePen, JSFiddle, or CodeSandbox, which support HTML, CSS, and JavaScript with live previews. Here’s how:
1. **Choose a Compiler**:
   - **CodePen** (https://codepen.io): Ideal for quick prototyping.
   - **JSFiddle** (https://jsfiddle.net): Simple and reliable for HTML/CSS/JS.
   - **CodeSandbox** (https://codesandbox.io): Best for multi-file projects like this one.
2. **Set Up the Project**:
   - Create a new project in the chosen compiler.
   - Copy the contents of `index.html` into the HTML panel, `styles.css` into the CSS panel, and `script.js` into the JavaScript panel.
   - For CodeSandbox, upload `index.html`, `styles.css`, and `script.js` as separate files in the root directory, ensuring `index.html` references `styles.css` and `script.js` correctly.
3. **Verify Dependencies**:
   - The app uses [Tailwind CSS](https://cdn.tailwindcss.com) and [Inter font](https://fonts.googleapis.com) via CDNs, already included in `index.html`.
   - Ensure the compiler allows external CDN resources (most do by default).
4. **Run and Test**:
   - Run the project to view the app in the compiler’s preview window.
   - Test adding tasks, marking them complete, and using the "Delete Completed Tasks" button.
   - Check responsiveness by resizing the preview or using mobile view options.

## Tips for Using the App
- **Adding Tasks**: Type a task, choose a priority (default is low), and optionally pick a due date. Press "Add Task" or Enter to add it to the list.
- **Managing Tasks**: Click the checkbox to mark a task as complete, “Edit” to modify the description, or “Delete” to remove a task (with confirmation).
- **Clearing Completed Tasks**: When tasks are marked complete, a “Delete Completed Tasks” button appears. Click it to remove all completed tasks after confirming.
- **Responsive Usage**: Try the app on different devices or use your browser’s developer tools to simulate mobile and tablet views.
- **Error Handling**: If you try to add an empty task, you’ll see a shake animation and an error message. Edited tasks must also have non-empty descriptions.

## Troubleshooting
- **Tasks Not Appearing**: Ensure JavaScript is enabled in your browser. In online compilers, verify that `script.js` is correctly linked in `index.html`.
- **Styling Issues**: Confirm that the Tailwind CSS CDN and Google Fonts are loading (requires internet access).
- **Online Compiler Errors**: If you see errors like `ReferenceError: toggleTask is not defined`, ensure `script.js` is loaded after the DOM and that the compiler isn’t using ES modules (e.g., in CodeSandbox, remove `"type": "module"` from `package.json` if present).
- **Testing Responsiveness**: Use the compiler’s mobile view or resize the preview to confirm the app works across screen sizes.

## Why This App Stands Out
The To-Do List Application combines functionality with a professional, modern design:
- **Intuitive Design**: A clean, card-based layout with color-coded priorities and clear task status indicators.
- **Smooth Experience**: Animations like fade-in for new tasks and shake for errors enhance usability.
- **Accessibility**: Supports keyboard navigation (Enter to add tasks) and focus states for screen readers.
- **Robust Features**: Beyond basic task management, it offers prioritization, due dates, sorting, and bulk deletion of completed tasks, all saved in local storage.

For support or inquiries, contact [info@unifiedmentor.com](mailto:info@unifiedmentor.com). Enjoy organizing your tasks with this powerful and stylish app!
