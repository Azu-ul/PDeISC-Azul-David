import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById } = useTasks();

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="alert alert-warning">
        Tarea no encontrada. <button className="btn btn-link p-0" onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  const handleExportOne = () => {
    const content =
`ID: ${task.id}
Título: ${task.title}
Descripción: ${task.description || 'Sin descripción'}
Estado: ${task.completed ? 'Completa' : 'Incompleta'}
Creada: ${new Date(task.createdAt).toLocaleString()}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarea-${task.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card shadow-sm win-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Detalle de Tarea</span>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-sm btn-outline-primary">Volver</Link>
          <button className="btn btn-sm btn-primary" onClick={handleExportOne}>Exportar .txt</button>
        </div>
      </div>

      <div className="card-body">
        <h2 className="h5">{task.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{task.description || 'Sin descripción'}</p>
        <div className="d-flex flex-wrap gap-3">
          <span className={`badge ${task.completed ? 'bg-success' : 'bg-secondary'}`}>
            {task.completed ? 'Completa' : 'Incompleta'}
          </span>
          <small className="text-muted">Creada el {new Date(task.createdAt).toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
}
