import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const FormEdit = ({ task, onClose }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const response = await fetch('/api/tasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTask)
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_TASKS', payload: json });
      onClose();  // Close the form after successful update
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-edit">
      <label>
        Nama Dosen:
        <input
          type="text"
          name="dosen"
          value={editedTask.dosen}
          onChange={handleChange}
        />
      </label>
      <label>
        Deadline:
        <input
          type="date"
          name="deadline"
          value={editedTask.deadline}
          onChange={handleChange}
        />
      </label>
      <label>
        Deskripsi:
        <textarea
          name="deskripsi"
          value={editedTask.deskripsi}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default FormEdit