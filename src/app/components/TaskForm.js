import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Moon, Sun } from 'lucide-react';

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Task Manager</h1>
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {darkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-gray-600" size={24} />}
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={`flex-grow p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={`flex items-center justify-between p-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'} border-b`}>
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : darkMode ? 'text-white' : 'text-gray-800'}`}>
              {task.text}
            </span>
            <div>
              <button
                onClick={() => toggleTask(task.id)}
                className="text-green-500 mr-2 hover:text-green-600 focus:outline-none"
              >
                <CheckCircle size={20} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;