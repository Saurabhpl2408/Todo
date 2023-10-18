import  { useState } from 'react';
// import './styles/App.css';
import AddTaskPopup from './AddTaskPopup';
import TodoList from './TodoList';
import PinnedCarousel from './PinnedCarousel';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [pinnedTasks, setPinnedTasks] = useState([]);

  const handleAddTask = (task) => {
    
    setTasks([...tasks, task]);

    if (task.pinned) {
      setPinnedTasks([...pinnedTasks, task]);
    }
  }

  const handleUpdateTasks = (updatedTasks) => {
    
    setTasks(updatedTasks);
  

  const updatedPinnedTasks = updatedTasks.filter((task) => task.pinned);
    setPinnedTasks(updatedPinnedTasks);
  }
 

  return (
<div className="App">
      <h1>My To-Do App</h1>
      <button className="add-task-button" onClick={() => setShowPopup(true)}>+</button>
      <TodoList tasks={tasks} onUpdateTasks={handleUpdateTasks} />
      <PinnedCarousel pinnedTasks={pinnedTasks} />
      {showPopup && <AddTaskPopup onAddTask={handleAddTask} />}
    </div>
  );
  }


export default App;
