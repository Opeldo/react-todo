import React, { useState, useRef } from 'react'; // Import React, useState, and useRef hooks
import './ToDo.css'; // Import the CSS specific to the ToDo component

function ToDo() { // Define the ToDo component
  const [tasks, setTasks] = useState([]); // State to keep track of the list of tasks
  const [inputValue, setInputValue] = useState(''); // State to keep track of the input value
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
  const inputRef = useRef(null); // Create a reference to the input element for focusing


  
  const addTask = () => { // Function to add a new task
    if (inputValue.trim() === '') { // Check if the input is empty or just whitespace
      setErrorMessage('Task cannot be empty.'); // Set an error message if input is invalid
      inputRef.current.focus(); // Bring focus back to the input field
      return; // Exit the function without adding the task
    }
    const newTask = { id: Date.now(), text: inputValue, done: false }; // Create a new task object
    setTasks([...tasks, newTask]); // Add the new task to the list of tasks
    setInputValue(''); // Clear the input field after adding the task
    setErrorMessage(''); // Clear any previous error message
    inputRef.current.focus(); // Bring focus back to the input field
  };

  const toggleTaskDone = (id) => { // Function to toggle the 'done' status of a task
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task // Toggle the done status for the selected task
    ));
  };

  const deleteTask = (id) => { // Function to delete a task
    const taskToDelete = tasks.find(task => task.id === id); // Find the task to be deleted
    if (window.confirm(`Are you sure you want to delete "${taskToDelete.text}"?`)) { // Confirm before deletion
      setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the list
    }
  };

  const sortedTasks = tasks.sort((a, b) => a.done - b.done); // Sort tasks so that done tasks are at the bottom

  return ( // Return the JSX to render the component
    <div className="ToDo"> {/* Main container for the ToDo component */}
      <h1>Todo List</h1> {/* Heading for the to-do list */}
      <div className="input-container"> {/* Container for the input field and add button */}
        <input
          type="text" // Input field for entering tasks
          value={inputValue} // Bind the input value to state
          ref={inputRef} // Attach the ref to the input element for focus management
          onChange={(e) => setInputValue(e.target.value)} // Update state when input changes
          placeholder="Add a new task" // Placeholder text for the input field
        />
        <button onClick={addTask}>Add</button> {/* Button to add a new task */}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message if it exists */}
      <ul className="task-list"> {/* List container for displaying tasks */}
        {sortedTasks.map(task => ( // Iterate over sorted tasks
          <li key={task.id} className={task.done ? 'done' : ''}> {/* List item for each task */}
            <span onClick={() => toggleTaskDone(task.id)}> {/* Toggle task status on click */}
              {task.text} {/* Display the task text */}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button> {/* Button to delete the task */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo; // Export the ToDo component as the default export
