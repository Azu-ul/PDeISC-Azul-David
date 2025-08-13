// components/TaskCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
  // Función para truncar descripción si es muy larga
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Link to={`/task/${task.id}`} className="task-item">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{task.title}</h5>
            <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
              {task.completed ? '✓ Completada' : '⏳ Pendiente'}
            </span>
          </div>
          
          <p className="card-text">
            {truncateDescription(task.description)}
          </p>
          
          <small className="text-muted">
            📅 Creada el: {task.createdAt}
          </small>
        </div>
      </div>
    </Link>
  );
}

export default TaskCard;