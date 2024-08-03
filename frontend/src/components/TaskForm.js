import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [matkul, setMatkul] = useState('')
  const [dosen, setDosen] = useState('')
  const [deadline, setDeadline] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = {matkul, dosen, deadline, deskripsi, completed}

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setMatkul('')
      setDosen('')
      setDeadline('')
      setDeskripsi('')
      setCompleted(false)
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_TASK', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Tambah Tugas Baru</h3>

      <label>Mata Kuliah:</label>
      <input 
        type="text"
        onChange={(e) => setMatkul(e.target.value)}
        value={matkul}
        className={emptyFields.includes('matkul') ? 'error' : ''}
      />

      <label>Dosen Pengampu:</label>
      <input 
        type="text"
        onChange={(e) => setDosen(e.target.value)}
        value={dosen}
        className={emptyFields.includes('dosen') ? 'error' : ''}
      />

      <label>Deadline Tugas:</label>
      <input 
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        className={emptyFields.includes('deadline') ? 'error' : ''}
      />

      <label>Deskripsi Tugas:</label>
      <textarea
        onChange={(e) => setDeskripsi(e.target.value)}
        value={deskripsi}
      />

      <label>Status Tugas:</label>
      <div className="checkbox-container">
        <label htmlFor="completed">Sudah Selesai?</label>
        <input 
          id="completed"
          type="checkbox"
          onChange={(e) => setCompleted(e.target.checked)}
          checked={completed}
        />
      </div>

      <button>Tambah Tugas</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TaskForm