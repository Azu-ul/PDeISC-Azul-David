import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function Create() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(''); // mensaje de validación

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (/^\d/.test(title.trim())) {
      setError('El título no puede comenzar con un número.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed,
      createdAt: new Date().toISOString()
    };

    addTask(newTask);
    navigate('/');
  };

  return (
    <div className="card shadow-sm win-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Crear Tarea</span>
        <Link to="/" className="btn btn-sm btn-outline-primary">Cancelar</Link>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Título *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Comprar pan"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Detalles de la tarea..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="col-12 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="completedCheck"
              checked={completed}
              onChange={e => setCompleted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="completedCheck">
              Marcar como completa
            </label>
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <Link to="/" className="btn btn-outline-secondary">Volver</Link>
          </div>

          <div className="col-12">
            <small className="text-muted">* Campo obligatorio</small>
          </div>
        </form>
      </div>
    </div>
  );
}
