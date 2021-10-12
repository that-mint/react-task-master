import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        // cant use tasks.push() as the usestate is immutable, 1 way data. 
        // Use settasks 
        // /* uses the id as the key to stop warning for unique key */
    <>
        {tasks.map((task) => (
            <Task 
                key={task.id} 
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
            >
            </Task>
    ))}
    </>
    )
}

export default Tasks
