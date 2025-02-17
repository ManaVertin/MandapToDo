import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt, FaCheck, FaClock } from "react-icons/fa";
import moment from "moment";
import Sidebar from "./Sidebar";
import "./App.css";

const App = () => {
  // State declarations
  const [tasks, setTasks] = useState([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load tasks from local storage when component mounts
useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  console.log("Loaded tasks from localStorage:", storedTasks);
  if (storedTasks) {
    try {
      setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error("Error parsing tasks:", error);
    }
  }
}, []);

// Save tasks to local storage whenever tasks change
useEffect(() => {
  console.log("Saving tasks to localStorage:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  // Add a new task
  const addTask = () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
      status: "pending", // Default status
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    // Clear form inputs
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
    setIsAddTaskOpen(false);
  };

  // Delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mark a task with a new status
  const markTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  // Return box shadow style based on task status
  const getTaskShadow = (status) => {
    if (status === "overdue") {
      return "0 4px 12px rgba(255, 0, 0, 0.6)";
    }
    if (status === "finished") {
      return "0 4px 12px rgba(0, 255, 0, 0.6)";
    }
    return "none";
  };

  // Filter tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const overdueTasks = tasks.filter((task) => task.status === "overdue");
  const finishedTasks = tasks.filter((task) => task.status === "finished");

  return (
    <div className={`app ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar miniLogoStyle={{ height: "30px" }} />

      <div className="main-content">
        <header>
          <h1>To-Do List</h1>
        </header>

        <div className="task-container">
          <button
            className="add-task-btn"
            onClick={() => setIsAddTaskOpen(true)}
          >
            <FaPlus /> Add Task
          </button>

          {isAddTaskOpen && (
            <div className="task-form">
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <input
                type="datetime-local"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
              />
              <button onClick={addTask}>Add Task</button>
              <button onClick={() => setIsAddTaskOpen(false)}>Cancel</button>
            </div>
          )}
          <div className="task-list">
            {/* Display Pending Tasks first */}
            <h2>Pending Tasks</h2>
            <div className="task-section">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  style={{ boxShadow: getTaskShadow(task.status) }}
                >
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {moment(task.deadline).format("LLL")}
                    </p>
                  </div>

                  <div className="task-actions">
                    <select
                      onChange={(e) => markTask(task.id, e.target.value)}
                      value={task.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="finished">Finished</option>
                    </select>

                    <button onClick={() => deleteTask(task.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Display Overdue Tasks */}
            <h2>Overdue Tasks</h2>
            <div className="task-section">
              {overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  style={{ boxShadow: getTaskShadow(task.status) }}
                >
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {moment(task.deadline).format("LLL")}
                    </p>
                  </div>

                  <div className="task-actions">
                    <select
                      onChange={(e) => markTask(task.id, e.target.value)}
                      value={task.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="finished">Finished</option>
                    </select>

                    <button onClick={() => deleteTask(task.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Display Finished Tasks */}
            <h2>Finished Tasks</h2>
            <div className="task-section">
              {finishedTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  style={{ boxShadow: getTaskShadow(task.status) }}
                >
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {moment(task.deadline).format("LLL")}
                    </p>
                  </div>

                  <div className="task-actions">
                    <select
                      onChange={(e) => markTask(task.id, e.target.value)}
                      value={task.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="finished">Finished</option>
                    </select>

                    <button onClick={() => deleteTask(task.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
