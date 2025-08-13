// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas del localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Datos iniciales para que no esté vacío
      const initialTasks = [
        {
          id: 1,
          title: "Estudiar React",
          description: "Completar el tutorial de React Router",
          createdAt: new Date('2024-01-15').toLocaleDateString(),
          completed: false
        },
        {
          id: 2,
          title: "Hacer ejercicio",
          description: "Correr 30 minutos en el parque",
          createdAt: new Date('2024-01-16').toLocaleDateString(),
          completed: true
        }
      ];
      setTasks(initialTasks);
      localStorage.setItem('todoTasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Función para agregar nueva tarea
  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(), // ID simple usando timestamp
      createdAt: new Date().toLocaleDateString()
    };
    setTasks([...tasks, task]);
  };

  // Función para exportar tareas a archivo .txt
  const exportTasks = () => {
    let content = "LISTA DE TAREAS\n";
    content += "================\n\n";
    
    tasks.forEach((task, index) => {
      content += `${index + 1}. ${task.title}\n`;
      content += `   Descripción: ${task.description}\n`;
      content += `   Fecha de creación: ${task.createdAt}\n`;
      content += `   Estado: ${task.completed ? 'Completada' : 'Pendiente'}\n`;
      content += `   ----------------------------------------\n\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'mis-tareas.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Router>
      <div className="App">
        <Navbar exportTasks={exportTasks} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home tasks={tasks} />} />
            <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} />
            <Route path="/create" element={<CreateTask addTask={addTask} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;