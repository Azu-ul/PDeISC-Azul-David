// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';

function Home({ tasks }) {
  return (
    <div>
      <div className="page-header">
        <h1>📋 Mis Tareas</h1>
        <p style={{ margin: '10px 0 0 0', opacity: '0.9' }}>
          Gestiona tus tareas diarias de manera sencilla
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              📊 Resumen
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <h4 className="text-primary">{tasks.length}</h4>
                  <small>Total</small>
                </div>
                <div className="col-4">
                  <h4 className="text-success">{tasks.filter(task => task.completed).length}</h4>
                  <small>Completadas</small>
                </div>
                <div className="col-4">
                  <h4 className="text-warning">{tasks.filter(task => !task.completed).length}</h4>
                  <small>Pendientes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <Link to="/create" className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div style={{ fontSize: '2rem' }}>➕</div>
              <div>Crear Nueva Tarea</div>
            </div>
          </Link>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="card text-center">
          <div className="card-body">
            <h4>📝 No hay tareas aún</h4>
            <p className="card-text">¡Comienza creando tu primera tarea!</p>
            <Link to="/create" className="btn btn-primary">
              Crear Primera Tarea
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 style={{ color: '#0078d4', marginBottom: '0' }}>
              📋 Lista de Tareas
            </h3>
            <small className="text-muted">
              Haz clic en cualquier tarea para ver los detalles
            </small>
          </div>
          
          <div className="row">
            {tasks.map(task => (
              <div key={task.id} className="col-md-6 mb-3">
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;