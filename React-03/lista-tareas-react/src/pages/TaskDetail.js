// pages/TaskDetail.js
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

function TaskDetail({ tasks }) {
  const { id } = useParams();
  const task = tasks.find(task => task.id === parseInt(id));

  // Si no encuentra la tarea, redirige al inicio
  if (!task) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="page-header">
        <h1>📄 Detalle de Tarea</h1>
      </div>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          ← Volver al Inicio
        </Link>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>📝 {task.title}</span>
          <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
            {task.completed ? '✅ Completada' : '⏳ Pendiente'}
          </span>
        </div>
        
        <div className="card-body">
          <div className="detail-info">
            <h3>📋 Información General</h3>
            <div className="row">
              <div className="col-md-6">
                <p><strong>🏷️ Título:</strong></p>
                <p style={{ fontSize: '1.1rem', color: '#0078d4' }}>
                  {task.title}
                </p>
              </div>
              <div className="col-md-6">
                <p><strong>📅 Fecha de Creación:</strong></p>
                <p style={{ fontSize: '1.1rem' }}>
                  {task.createdAt}
                </p>
              </div>
            </div>
          </div>

          <div className="detail-info">
            <h3>📝 Descripción</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', minHeight: '60px' }}>
              {task.description}
            </p>
          </div>

          <div className="detail-info">
            <h3>📊 Estado</h3>
            <div className="d-flex align-items-center">
              <span 
                className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}
                style={{ fontSize: '1.1rem', padding: '10px 20px' }}
              >
                {task.completed ? '✅ Tarea Completada' : '⏳ Tarea Pendiente'}
              </span>
              {task.completed && (
                <span className="ms-3" style={{ color: '#008000' }}>
                  🎉 ¡Buen trabajo!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="card-footer text-center">
          <Link to="/" className="btn btn-primary me-2">
            🏠 Ir al Inicio
          </Link>
          <Link to="/create" className="btn btn-success">
            ➕ Crear Nueva Tarea
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;