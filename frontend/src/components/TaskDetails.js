import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format } from 'date-fns';

const TaskDetails = ({ task }) => {
  const formattedDeadline = format(new Date(task.deadline), 'dd-MM-yyyy');
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const handleClickDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  return (
    <div className="task-details">
      <h4>{task.matkul}</h4>
      <pre><strong>Dosen Pengampu  : </strong>{task.dosen}</pre>
      <pre><strong>Deadline Tugas  : </strong>{formattedDeadline}</pre>
      <pre><strong>Deskripsi Tugas : </strong>{task.deskripsi}</pre>
      <pre>
        <strong>Status Tugas    : </strong>
        <div className={`status ${task.completed ? 'completed' : 'not-completed'}`}>
          {task.completed ? 'Completed' : 'Not Completed'}
        </div>
      </pre>
      <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClickDelete}>delete</span>
    </div>
  )
}

export default TaskDetails