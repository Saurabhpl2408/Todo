// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import './styles/AddTaskPopup.css';

function AddTaskPopup({ onAddTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [isRepetitive, setIsRepetitive] = useState(false);
  const [taskImage, setTaskImage] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      name: taskName,
      date: taskDate,
      priority,
      isRepetitive,
      image: taskImage,
      pinned:isPinned
    };
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    onAddTask(task);

    // Reset form fields
    setTaskName('');
    setTaskDate('');
    setPriority('Low');
    setIsRepetitive(false);
    setTaskImage('');
    setIsPinned(false);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={() => onAddTask(false)}>&times;</span>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </label>
          <label>
            Task Date:
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          </label>
          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Repetitive Task:
            <input
              type="checkbox"
              checked={isRepetitive}
              onChange={(e) => setIsRepetitive(e.target.checked)}
            />
          </label>
          <label>
            Task Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTaskImage(URL.createObjectURL(e.target.files[0]))}
            />
          </label>
          <button type="submit">Add Task </button>
        </form>
      </div>
    </div>
  );
}

AddTaskPopup.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default AddTaskPopup;
