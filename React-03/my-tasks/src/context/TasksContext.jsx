import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadTasks());

  // Guardar ante cada cambio
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // helpers simples
  const addTask = (task) => {
    setTasks(prev => {
      const next = [...prev, task];
      return next;
    });
  };

  const getTaskById = (id) => tasks.find(t => String(t.id) === String(id));

  const value = useMemo(() => ({ tasks, addTask, getTaskById }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TasksProvider>');
  return ctx;
}
