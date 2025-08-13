// pages/CreateTask.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateTask({ addTask }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    
    return newErrors;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Crear la nueva tarea
    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      completed: formData.completed
    });

    // Redirigir al inicio
    navigate('/');
  };

  return (
    <div>
      <div className="page-header">
        <h1>➕ Crear Nueva Tarea</h1>
        <p style={{ margin: '10px 0 0 0', opacity: '0.9' }}>
          Completa la información para agregar una nueva tarea
        </p>
      </div>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          ← Volver al Inicio
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              📝 Formulario de Nueva Tarea
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    🏷️ Título de la Tarea *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ej: Estudiar para el examen"
                    maxLength="100"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title}
                    </div>
                  )}
                  <div className="form-text">
                    {formData.title.length}/100 caracteres
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    📝 Descripción *
                  </label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe los detalles de tu tarea..."
                    rows="4"
                    maxLength="500"
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description}
                    </div>
                  )}
                  <div className="form-text">
                    {formData.description.length}/500 caracteres
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="completed"
                      name="completed"
                      checked={formData.completed}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="completed">
                      ✅ Marcar como completada
                    </label>
                  </div>
                  <div className="form-text">
                    Puedes marcar la tarea como completada si ya la terminaste
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/" className="btn btn-secondary me-md-2">
                    ❌ Cancelar
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    💾 Crear Tarea
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tarjeta de ayuda */}
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-title">💡 Consejos</h6>
              <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
                <li>Usa títulos descriptivos y claros</li>
                <li>Incluye todos los detalles importantes en la descripción</li>
                <li>Puedes marcar la tarea como completada desde el inicio</li>
                <li>Las tareas se guardan automáticamente en tu navegador</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;