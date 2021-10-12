import { TiDeleteOutline } from 'react-icons/ti'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        // If task.reminder is true, classname is turned into reminder, else nothing
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            {/* state gets passed down, events get passed up */}
            <h3>{task.text} <TiDeleteOutline style={{color:'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} /></h3>
            <p>{task.day}</p>
            
        </div>
    )
}

export default Task
