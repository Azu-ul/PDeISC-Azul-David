import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext'; // Importar el contexto de tareas

// Componente para mostrar el detalle de una tarea
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate(); //
  const { getTaskById, updateTask, deleteTask } = useTasks(); 

  // Estados para manejar la edición 
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  const task = getTaskById(id);

  //Editar título y descripción
  // Si la tarea existe, inicializar los campos de edición
  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description || '');
    }
  }, [task]);

  // Si la tarea no existe, mostrar un mensaje y volver al inicio
  if (!task) {
    return (
      <div className="alert alert-warning">
        Tarea no encontrada. <button className="btn btn-link p-0" onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  // Manejar la eliminación de la tarea
  // Muestra un mensaje de confirmación antes de eliminar
  const handleDelete = () => setShowConfirmDelete(true);
  const confirmDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  // Renderizar el detalle de la tarea
  // Permite editar el título y la descripción, marcar como completa/incompleta, y borrar la tarea
  return (
    <div className="card shadow-sm win-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Detalle de Tarea</span>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-sm btn-outline-primary">Volver</Link>
          <button className="btn btn-sm btn-warning" onClick={() => setEditing(true)}>Editar</button>
          <button
            className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
            onClick={() => updateTask(task.id, { completed: !task.completed })}
          > 
            {task.completed ? 'Marcar como incompleta' : 'Marcar como completa'}
          </button> 
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>Borrar</button>
        </div>
      </div>
      
      {/* Confirmación para borrar tarea */}
      <div className="card-body">
        {showConfirmDelete && (
          <div className="alert alert-warning d-flex justify-content-between align-items-center">
            <span>¿Seguro que querés borrar esta tarea?</span>
            <div>
              <button className="btn btn-sm btn-danger me-2" onClick={confirmDelete}>Sí, borrar</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Formulario de edición */}
        {/* Si está en modo edición, mostrar el formulario para editar título y descripción */}
        {/* Si no está en modo edición, mostrar el detalle de la tarea */}

        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTask(task.id, { title: editTitle.trim(), description: editDescription.trim() });
              setEditing(false);
            }}
            className="row g-3"
          >
            <div className="col-12">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="4"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          </form>
        ) : ( 
          <>
            <h2 className="h5">{task.title}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{task.description || 'Sin descripción'}</p>
            <div className="d-flex flex-wrap gap-3">
              <span className={`badge ${task.completed ? 'bg-success' : 'bg-secondary'}`}>
                {task.completed ? 'Completa' : 'Incompleta'}
              </span>
              <small className="text-muted">Creada el {new Date(task.createdAt).toLocaleString()}</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
