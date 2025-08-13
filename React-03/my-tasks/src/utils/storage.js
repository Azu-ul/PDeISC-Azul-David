const KEY = 'tasks';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  // Semillas mínimas para que no quede vacío la primera vez
  const seed = [
    {
      id: Date.now() - 2,
      title: 'Leer consignas',
      description: 'Repasar los requerimientos del trabajo práctico.',
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: Date.now() - 1,
      title: 'Crear estructura',
      description: 'Armar páginas: Inicio, Detalle, Crear.',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];
  saveTasks(seed);
  return seed;
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {}
}
