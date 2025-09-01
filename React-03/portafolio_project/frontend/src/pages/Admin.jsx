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
        await axios.put(`http://localhost:5000/api/admin/portfolio/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/admin/portfolio', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
      setFormState({ id: null, title: '', description: '', url: '', image: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section 
      className="py-5 bg-white" 
      style={{ 
        fontFamily: 'Georgia, serif', 
        minHeight: '100vh',
        paddingTop: '120px !important'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h2 
                className="display-4 fw-normal mb-3" 
                style={{ 
                  color: '#2c2c2c',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px'
                }}
              >
                Admin Panel
              </h2>
              <div style={{ marginTop: '2rem' }}>
                <button 
                  onClick={logout}
                  className="text-decoration-none"
                  style={{
                    color: '#2c2c2c',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: '400',
                    borderBottom: '1px solid #2c2c2c',
                    paddingBottom: '2px',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.borderColor = '#666';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#2c2c2c';
                    e.target.style.borderColor = '#2c2c2c';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="row">
              {/* Form Section */}
              <div className="col-lg-6 mb-5">
                <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                  <h3 
                    className="h4 mb-4" 
                    style={{
                      color: '#2c2c2c',
                      fontWeight: '400',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {formState.id ? 'Edit Project' : 'Create New Project'}
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        placeholder="Project title"
                        required
                        style={{
                          width: '100%',
                          padding: '15px 0',
                          fontSize: '1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #eee',
                          outline: 'none',
                          color: '#2c2c2c',
                          fontFamily: 'Georgia, serif'
                        }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#eee'}
                      />
                    </div>

                    <div className="mb-4">
                      <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        placeholder="Project description"
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '15px 0',
                          fontSize: '1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #eee',
                          outline: 'none',
                          color: '#2c2c2c',
                          fontFamily: 'Georgia, serif',
                          resize: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#eee'}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="url"
                        name="url"
                        value={formState.url}
                        onChange={handleChange}
                        placeholder="Project URL (optional)"
                        style={{
                          width: '100%',
                          padding: '15px 0',
                          fontSize: '1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #eee',
                          outline: 'none',
                          color: '#2c2c2c',
                          fontFamily: 'Georgia, serif'
                        }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#eee'}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="url"
                        name="image"
                        value={formState.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        style={{
                          width: '100%',
                          padding: '15px 0',
                          fontSize: '1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #eee',
                          outline: 'none',
                          color: '#2c2c2c',
                          fontFamily: 'Georgia, serif'
                        }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#2c2c2c'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#eee'}
                      />
                    </div>

                    <div className="mt-4">
                      <button 
                        type="submit"
                        className="text-decoration-none me-3"
                        style={{
                          color: '#2c2c2c',
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          fontWeight: '400',
                          borderBottom: '1px solid #2c2c2c',
                          paddingBottom: '2px',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#666';
                          e.target.style.borderColor = '#666';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#2c2c2c';
                          e.target.style.borderColor = '#2c2c2c';
                        }}
                      >
                        {formState.id ? 'Update' : 'Create'}
                      </button>
                      
                      {formState.id && (
                        <button
                          type="button"
                          onClick={() => setFormState({ id: null, title: '', description: '', url: '', image: '' })}
                          className="text-decoration-none"
                          style={{
                            color: '#666',
                            fontSize: '0.9rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontWeight: '400',
                            borderBottom: '1px solid #666',
                            paddingBottom: '2px',
                            transition: 'all 0.3s ease',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = '#2c2c2c';
                            e.target.style.borderColor = '#2c2c2c';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = '#666';
                            e.target.style.borderColor = '#666';
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Projects List Section */}
              <div className="col-lg-6 mb-5">
                <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                  <h3 
                    className="h4 mb-4" 
                    style={{
                      color: '#2c2c2c',
                      fontWeight: '400',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Existing Projects
                  </h3>

                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <div 
                          key={project.id} 
                          className="mb-4"
                          style={{
                            paddingBottom: '2rem',
                            borderBottom: '1px solid #eee'
                          }}
                        >
                          <h5 
                            className="h6 mb-3" 
                            style={{
                              color: '#2c2c2c',
                              fontWeight: '400',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {project.title}
                          </h5>
                          
                          <p 
                            className="mb-3" 
                            style={{ 
                              color: '#666', 
                              lineHeight: '1.7',
                              fontSize: '0.95rem'
                            }}
                          >
                            {project.description}
                          </p>
                          
                          {project.url && (
                            <p className="mb-3">
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                style={{
                                  color: '#666',
                                  fontSize: '0.85rem',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {project.url}
                              </a>
                            </p>
                          )}
                          
                          <div className="d-flex gap-3">
                            <button 
                              onClick={() => handleEdit(project)}
                              className="text-decoration-none"
                              style={{
                                color: '#2c2c2c',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontWeight: '400',
                                borderBottom: '1px solid #2c2c2c',
                                paddingBottom: '2px',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.color = '#666';
                                e.target.style.borderColor = '#666';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.color = '#2c2c2c';
                                e.target.style.borderColor = '#2c2c2c';
                              }}
                            >
                              Edit
                            </button>
                            
                            <button 
                              onClick={() => handleDelete(project.id)}
                              className="text-decoration-none"
                              style={{
                                color: '#999',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontWeight: '400',
                                borderBottom: '1px solid #999',
                                paddingBottom: '2px',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.color = '#2c2c2c';
                                e.target.style.borderColor = '#2c2c2c';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.color = '#999';
                                e.target.style.borderColor = '#999';
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-5">
                        <p style={{ color: '#999', fontSize: '1.1rem' }}>No projects available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;