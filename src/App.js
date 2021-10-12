import './App.css';
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  
  const [showAddTask, setShowAddTask] = useState(false)

  const[tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])
  
  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    
    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) + 1
    // // Adds the id that was generated and the rest of the task array
    // const newTask = {id, ...task}
    // // Sets the tasks to all the existing tasks, plus the new task (...) represents the entire array.
    // setTasks([...tasks, newTask])
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })


    //console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    // set updated task to only change the reminder, gets the rest of the task and only swaps reminder.
    const updatedTask =  {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    //console.log(id)
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }
  
  return (
    <div className="container">
      {/* When add button is pressed, set showaddtask to the opposite of the current value, default false */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {/* If showAddTask is true, show the component. && another way to say "if before ture, run after with no else" */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* If tasks length is greater than 0, show tasks, otherwise show the text */}
      {tasks.length > 0 ? <Tasks 
        tasks={tasks} 
        onDelete={deleteTask}
        onToggle={toggleReminder}
      /> : 'No tasks to complete!'}
    </div>
  );
}

export default App;
