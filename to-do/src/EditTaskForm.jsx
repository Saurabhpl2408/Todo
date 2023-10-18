// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function EditTaskForm({ task, onUpdate }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleUpdate = () => {
    onUpdate(editedTask);
  };

  return (
    <div className="edit-task-form">
      <h3>Edit Task</h3>
      <input
        type="text"
        value={editedTask.name}
        onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
        required
      />
      <input
        type="date"
        value={editedTask.date}
        onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
        required
      />
      <select
        value={editedTask.priority}
        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label>
        Repetitive Task:
        <input
          type="checkbox"
          checked={editedTask.isRepetitive}
          onChange={(e) => setEditedTask({ ...editedTask, isRepetitive: e.target.checked })}
        />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEditedTask({ ...editedTask, image: URL.createObjectURL(e.target.files[0]) })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditTaskForm;
