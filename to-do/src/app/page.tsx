'use client'; // Marking this file as a client component

import { useState } from 'react'; // Importing the useState hook

export default function Home() {
    const [tasks, setTasks] = useState<any[]>([]); // State to hold tasks

    // Function to add a task
    function addTask() {
        const taskInput = (document.getElementById('task-input') as HTMLInputElement).value.trim();
        if (taskInput !== '') {
            const newTask = { text: taskInput, done: false };
            setTasks([...tasks, newTask]); // Update tasks state
            (document.getElementById('task-input') as HTMLInputElement).value = ''; // Clear input
        }
    }

    // Function to toggle task done/undone
    function toggleDone(index: number) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks); // Update tasks state
    }

    // Function to edit a task
    function editTask(index: number) {
        const newTaskText = prompt('Edit Task', tasks[index].text);
        if (newTaskText && newTaskText.trim() !== '') {
            const updatedTasks = [...tasks];
            updatedTasks[index].text = newTaskText.trim();
            setTasks(updatedTasks); // Update tasks state
        }
    }

    // Function to delete a task
    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks); // Update tasks state
    }

    // Function to search tasks
    function searchTasks() {
        const searchInput = (document.getElementById('search') as HTMLInputElement).value.toLowerCase();
        const filteredTasks = tasks.filter((task) =>
            task.text.toLowerCase().includes(searchInput)
        );
        displayTasks(filteredTasks); // Display filtered tasks
    }

    // Function to display filtered tasks (for search)
    function displayTasks(tasksToDisplay: any[] = tasks) {
        return tasksToDisplay.map((task, index) => (
            <li key={index} className={`task-item ${task.done ? 'done' : ''}`}>
                <span>{task.text}</span>
                <button onClick={() => toggleDone(index)}>{task.done ? 'Undo' : 'Done'}</button>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
        ));
    }

    return (
        <div>
            <h1>To-Do List</h1>
            <input type="text" id="task-input" placeholder="Enter a task" />
            <button onClick={addTask}>Add Task</button>

            <input
                type="text"
                id="search"
                placeholder="Search tasks"
                onChange={searchTasks}
            />

            <ul id="task-list">{displayTasks()}</ul>
        </div>
    );
}
