import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function Home() {
  const { tasks } = useTasks();

  const hasTasks = tasks && tasks.length > 0;

  const handleExportTxt = () => {
    const lines = tasks.map(t =>
      `ID: ${t.id}\nTítulo: ${t.title}\nDescripción: ${t.description}\nEstado: ${t.completed ? 'Completa' : 'Incompleta'}\nCreada: ${new Date(t.createdAt).toLocaleString()}\n---`
    );
    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fecha = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
    a.href = url;
    a.download = `tareas-${fecha}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sorted = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [tasks]
  );

  return (
    <div className="card shadow-sm win-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Lista de Tareas</span>
        <div className="d-flex gap-2">
          <Link to="/create" className="btn btn-sm btn-primary">+ Nueva</Link>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleExportTxt}
            disabled={!hasTasks}
            title={hasTasks ? 'Exportar todas las tareas a .txt' : 'No hay tareas'}
          >
            Exportar .txt
          </button>
        </div>
      </div>

      <div className="list-group list-group-flush">
        {hasTasks ? (
          sorted.map(t => (
            <Link
              to={`/task/${t.id}`}
              key={t.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
            >
              <div className="me-3">
                <div className="fw-semibold">{t.title}</div>
                <small className="text-muted">
                  {t.description?.slice(0, 80) || 'Sin descripción'}
                  {t.description && t.description.length > 80 ? '…' : ''}
                </small>
              </div>
              <span className={`badge ${t.completed ? 'bg-success' : 'bg-secondary'}`}>
                {t.completed ? 'Completa' : 'Incompleta'}
              </span>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-muted">
            Aún no hay tareas. Creá la primera 👉 <Link to="/create">aquí</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
