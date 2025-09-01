import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    title: '',
    description: '',
    url: '',
    image: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/portfolio');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleEdit = (project) => {
    setFormState(project);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este proyecto?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...data } = formState;

    try {
      if (id) {
        // Update an existing project
        await axios.put(`http://localhost:5000/api/admin/portfolio/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        // Create a new project
        await axios.post('http://localhost:5000/api/admin/portfolio', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
      setFormState({ id: null, title: '', description: '', url: '', image: '' }); // Reset form
      fetchProjects();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Panel de Administración</h2>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={logout} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      <div className="row">
        {/* Formulario de Creación/Edición */}
        <div className="col-md-6 mb-4">
          <h3>{formState.id ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Título"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Descripción"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                name="url"
                value={formState.url}
                onChange={handleChange}
                placeholder="URL del proyecto"
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                name="image"
                value={formState.image}
                onChange={handleChange}
                placeholder="URL de la imagen"
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {formState.id ? 'Actualizar' : 'Crear'}
            </button>
            {formState.id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFormState({ id: null, title: '', description: '', url: '', image: '' })}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* Lista de Proyectos */}
        <div className="col-md-6">
          <h3>Proyectos Existentes</h3>
          <ul className="list-group">
            {projects.length > 0 ? (
              projects.map((project) => (
                <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{project.title}</h5>
                    <p>{project.description}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(project)} className="btn btn-warning btn-sm me-2">Editar</button>
                    <button onClick={() => handleDelete(project.id)} className="btn btn-danger btn-sm">Eliminar</button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item">No hay proyectos para mostrar.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;