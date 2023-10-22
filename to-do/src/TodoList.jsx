// import PropTypes from 'prop-types';
import "./styles/TodoList.css";
import { useState, useEffect } from "react";
import EditTaskForm from "./EditTaskForm";

function TodoList() {
  const [editTask, setEditTask] = useState(null);
  const [savedTasks, setSavedTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [pinnedTasks, setPinnedTasks] = useState([]);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleDelete = (task) => {
    const updatedTasks = savedTasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSavedTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }, [savedTasks]);

  const handlePinTask = (id) => {
    const updatedtasks = savedTasks.map((task) => {
      if (task.id === id) {
        return { ...task, pinned: !task.pinned };
      }
      return task;
    });
    setSavedTasks(updatedtasks);

    window.location.reload();
  };

  // const handlePinTask = (task) => {
  //   if (!pinnedTasks.includes(task)) {
  //     const updatedPinnedTasks = [...pinnedTasks, task];
  //     setPinnedTasks(updatedPinnedTasks);
  //   }
  // };

  const handleUnpinTask = (task) => {
    const updatedPinnedTasks = pinnedTasks.filter((t) => t !== task);
    setPinnedTasks(updatedPinnedTasks);
  };

  const handleUpdate = (updatedTask) => {
    const updatedTasks = savedTasks.map((task) =>
      task === editTask ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditTask(null);
    setSavedTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      {savedTasks.map((task) => (
        <div key={task.id} className="task">
          {editTask === task ? (
            <EditTaskForm task={task} onUpdate={handleUpdate} />
          ) : (
            <>
              <h3>{task.name}</h3>
              <p>Date: {task.date}</p>
              <p>Priority: {task.priority}</p>
              <p>Repetitive: {task.isRepetitive ? "Yes" : "No"}</p>
              {task.image && <img src={task.image} alt="Task" />}
              <div className="task-controls">
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task)}>Delete</button>
                {task.pinned ? (
                  <button onClick={() => handlePinTask(task.id)}>
                    Unpin Task
                  </button>
                ) : (
                  <button onClick={() => handlePinTask(task.id)}>
                    Pin Task
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
// TodoList.propTypes = {
//     tasks: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//         priority: PropTypes.string.isRequired,
//         isRepetitive: PropTypes.bool.isRequired,
//         image: PropTypes.string,
//       })
//     ).isRequired,
//   };

export default TodoList;
