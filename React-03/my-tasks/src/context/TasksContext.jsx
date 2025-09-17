import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';

// Crear un contexto para las tareas
// Este contexto proporcionará las tareas y funciones para manipularlas
const TasksContext = createContext(null);

export function TasksProvider({ children }) {

  // Cargar tareas desde el almacenamiento local al iniciar
  const [tasks, setTasks] = useState(() => loadTasks());
  
  // Guardar tareas en el almacenamiento local cada vez que cambien
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Funciones para manipular las tareas
  // Agregar una nueva tarea
  const addTask = (task) => {
    setTasks(prev => {
      const next = [...prev, task];
      return next;
    });
  };

  // Obtener una tarea por ID
  const getTaskById = (id) => tasks.find(t => String(t.id) === String(id));

  // Actualizar una tarea existente
  // Permite actualizar campos específicos de una tarea
  const updateTask = (id, updatedFields) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    );
  };

  // Eliminar una tarea por ID
  // Elimina una tarea del estado
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Crear el contexto con las funciones y tareas
  // useMemo para evitar recrear el objeto en cada render
  const value = useMemo(() => ({
    tasks,
    addTask,
    getTaskById,
    updateTask,   
    deleteTask    
    }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

// Custom hook para acceder al contexto de tareas
// Permite usar el contexto de manera más sencilla en los componentes
export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TasksProvider>');
  return ctx;
}
