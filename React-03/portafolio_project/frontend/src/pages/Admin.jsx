import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// FormInput simple
const FormInput = ({ label, name, value, onChange, type = 'text', options = null }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px', display: 'block' }}>{label}</label>
      {options ? (
        <select
          name={name}
          value={localValue}
          onChange={handleChange}
          style={{
            width: '100%', padding: '12px 0', fontSize: '1rem',
            backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #eee',
            outline: 'none', color: '#2c2c2c', fontFamily: 'Georgia, serif'
          }}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={localValue}
          onChange={handleChange}
          style={{
            width: '100%', padding: '12px 0', fontSize: '1rem',
            backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #eee',
            outline: 'none', color: '#2c2c2c', fontFamily: 'Georgia, serif'
          }}
        />
      )}
    </div>
  );
};

// Botón
const Button = ({ onClick, children, variant = 'primary', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      color: variant === 'primary' ? '#2c2c2c' : '#666',
      fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase',
      fontWeight: '400', borderBottom: `1px solid ${variant === 'primary' ? '#2c2c2c' : '#666'}`,
      paddingBottom: '2px', backgroundColor: 'transparent', border: 'none',
      cursor: 'pointer', marginRight: '15px'
    }}
  >
    {children}
  </button>
);

// StatusMessage
const StatusMessage = ({ message, type, onClose }) => {
  if (!message) return null;
  
  return (
    <div
      style={{
        padding: '12px 20px',
        marginTop: '20px',
        backgroundColor: type === 'success' ? 'rgba(247, 153, 149, 0.1)' : '#fff5f5',
        border: `1px solid ${type === 'success' ? '#F79995' : '#dc3545'}`,
        color: type === 'success' ? '#F79995' : '#dc3545',
        borderRadius: '4px',
        fontSize: '0.9rem',
        position: 'relative'
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>
  );
};

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  const [projects, setProjects] = useState([]);
  const [header, setHeader] = useState({});
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});
  const [projectForm, setProjectForm] = useState({
    id: null,
    title: '',
    description: '',
    url: '',
    image: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  
  // Skills simplificadas
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({
    id: null,
    name: '',
    level: 50,
    parent_category: 'Técnicas'
  });

  // Categorías disponibles
  const availableCategories = [
    { value: 'Técnicas', label: 'Habilidades Técnicas' },
    { value: 'Profesionales', label: 'Habilidades Profesionales' },
    { value: 'Idiomas', label: 'Idiomas' },
    { value: 'Herramientas', label: 'Herramientas' }
  ];

  const token = localStorage.getItem('token');
  const apiHeaders = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      const [projectsRes, headerRes, aboutRes, contactRes, footerRes, skillsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/projects'),
        axios.get('http://localhost:5000/api/content/header'),
        axios.get('http://localhost:5000/api/content/about'),
        axios.get('http://localhost:5000/api/content/contact'),
        axios.get('http://localhost:5000/api/content/footer'),
        axios.get('http://localhost:5000/api/admin/skills')
      ]);
      
      setProjects(projectsRes.data);
      setHeader(headerRes.data);
      setAbout(aboutRes.data);
      setContact(contactRes.data);
      setFooter(footerRes.data);
      setSkills(skillsRes.data);
      console.log('Skills loaded:', skillsRes.data); // Debug
    } catch (error) {
      console.error('Error loading content:', error);
      setStatus({ 
        message: 'Error al cargar el contenido', 
        type: 'error' 
      });
    }
  };

  // Funciones de proyecto (mantener igual)
  const editProject = (project) => {
    setProjectForm({
      id: project.id ?? null,
      title: project.title || '',
      description: project.description || '',
      url: project.url || '',
      image: project.image || ''
    });
  };

  const resetProjectForm = () => {
    setProjectForm({ id: null, title: '', description: '', url: '', image: '' });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { id, ...data } = projectForm;

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/admin/projects/${id}`,
          data,
          { headers: apiHeaders }
        );
        setStatus({ message: 'Proyecto actualizado exitosamente', type: 'success' });
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/projects',
          data,
          { headers: apiHeaders }
        );
        setStatus({ message: 'Proyecto creado exitosamente', type: 'success' });
      }

      resetProjectForm();
      loadAllContent();
    } catch (error) {
      console.error('Error with project:', error);
      setStatus({ message: 'Error al guardar el proyecto', type: 'error' });
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('¿Eliminar proyecto?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/projects/${id}`, { headers: apiHeaders });
      loadAllContent();
      setStatus({ message: 'Proyecto eliminado exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error deleting project:', error);
      setStatus({ message: 'Error al eliminar el proyecto', type: 'error' });
    }
  };

  const updateContent = async (section, data) => {
    try {
      await axios.put(`http://localhost:5000/api/content/${section}`, data, { headers: apiHeaders });
      loadAllContent();
      setStatus({ message: `Sección ${section} actualizada exitosamente`, type: 'success' });
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
      setStatus({ message: `Error al actualizar sección ${section}`, type: 'error' });
    }
  };

  // Funciones para manejar skills SIMPLIFICADAS
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const { id, ...data } = skillForm;
    
    // Datos simplificados para la skill
    const skillData = {
      type: 'skill',
      parent_category: data.parent_category,
      name: data.name,
      level: parseInt(data.level) || 50,
      description: null
    };

    console.log('Sending skill data:', skillData); // Debug

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/admin/skills/${id}`,
          skillData,
          { headers: apiHeaders }
        );
        setStatus({ message: 'Habilidad actualizada exitosamente', type: 'success' });
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/skills',
          skillData,
          { headers: apiHeaders }
        );
        setStatus({ message: 'Habilidad creada exitosamente', type: 'success' });
      }

      resetSkillForm();
      loadAllContent();
    } catch (error) {
      console.error('Error with skill:', error.response?.data || error);
      setStatus({ message: 'Error al guardar la habilidad', type: 'error' });
    }
  };

  const editSkill = (skill) => {
    setSkillForm({
      id: skill.id || null,
      name: skill.name || '',
      level: skill.level || 50,
      parent_category: skill.parent_category || 'Técnicas'
    });
  };

  const resetSkillForm = () => {
    setSkillForm({
      id: null,
      name: '',
      level: 50,
      parent_category: 'Técnicas'
    });
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('¿Eliminar habilidad?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/skills/${id}`, { headers: apiHeaders });
      loadAllContent();
      setStatus({ message: 'Habilidad eliminada exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      setStatus({ message: 'Error al eliminar la habilidad', type: 'error' });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStatus({ message: '', type: '' });
  };

  return (
    <section className="py-5 bg-white" style={{ 
      fontFamily: 'Georgia, serif', 
      minHeight: '100vh', 
      paddingTop: '160px',
      marginTop: '100px'
    }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-normal mb-3" style={{ color: '#2c2c2c', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-1px' }}>
            Admin Panel
          </h2>
        </div>

        {/* Tabs */}
        <div className="text-center mb-5" style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          {['projects', 'header', 'about', 'contact', 'footer', 'skills'].map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                color: activeTab === tab ? '#F79995' : '#666',
                fontSize: '1rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: '400',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                margin: '0 45px',
                padding: '10px 15px',
                borderBottom: activeTab === tab ? '2px solid #F79995' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab (mantener igual) */}
        {activeTab === 'projects' && (
          <div className="row">
            <div className="col-lg-6">
              <h3>{projectForm.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
              <form onSubmit={handleProjectSubmit}>
                <FormInput label="Título" name="title" value={projectForm.title} onChange={val => setProjectForm({ ...projectForm, title: val })} />
                <FormInput label="Descripción" name="description" value={projectForm.description} onChange={val => setProjectForm({ ...projectForm, description: val })} />
                <FormInput label="URL" name="url" value={projectForm.url} type="url" onChange={val => setProjectForm({ ...projectForm, url: val })} />
                <FormInput label="Imagen URL" name="image" value={projectForm.image} type="url" onChange={val => setProjectForm({ ...projectForm, image: val })} />
                <Button type="submit">{projectForm.id ? 'Actualizar' : 'Crear'}</Button>
                {projectForm.id && (
                  <Button type="button" variant="secondary" onClick={resetProjectForm}>Cancelar</Button>
                )}
                <StatusMessage 
                  message={status.message} 
                  type={status.type} 
                  onClose={() => setStatus({ message: '', type: '' })}
                />
              </form>
            </div>
            <div className="col-lg-6">
              <h3>Proyectos Existentes</h3>
              {projects.map(project => (
                <div key={project.id} style={{ paddingBottom: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                  <Button onClick={() => editProject(project)}>Editar</Button>
                  <Button variant="secondary" onClick={() => deleteProject(project.id)}>Eliminar</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab SIMPLIFICADO */}
        {activeTab === 'skills' && (
          <div className="row">
            <div className="col-lg-6">
              <h3>{skillForm.id ? 'Editar Habilidad' : 'Nueva Habilidad'}</h3>
              <form onSubmit={handleSkillSubmit}>
                <FormInput 
                  label="Categoría" 
                  name="parent_category" 
                  value={skillForm.parent_category} 
                  options={availableCategories}
                  onChange={val => setSkillForm({ ...skillForm, parent_category: val })} 
                />
                <FormInput 
                  label="Nombre de la Habilidad" 
                  name="name" 
                  value={skillForm.name} 
                  onChange={val => setSkillForm({ ...skillForm, name: val })} 
                />
                <FormInput 
                  label="Nivel (%)" 
                  name="level" 
                  type="range" 
                  min="0"
                  max="100"
                  value={skillForm.level.toString()} 
                  onChange={val => setSkillForm({ ...skillForm, level: parseInt(val) || 50 })} 
                />
                <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2rem', color: '#F79995' }}>
                  {skillForm.level}%
                </div>
                
                <Button type="submit">{skillForm.id ? 'Actualizar' : 'Crear'}</Button>
                {skillForm.id && (
                  <Button type="button" variant="secondary" onClick={resetSkillForm}>Cancelar</Button>
                )}
                <StatusMessage 
                  message={status.message} 
                  type={status.type} 
                  onClose={() => setStatus({ message: '', type: '' })}
                />
              </form>
            </div>
            
            <div className="col-lg-6">
              <h3>Habilidades Existentes ({skills.length})</h3>
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {Object.entries(skills.reduce((acc, skill) => {
                  const category = skill.parent_category || 'General';
                  if (!acc[category]) {
                    acc[category] = [];
                  }
                  acc[category].push(skill);
                  return acc;
                }, {})).map(([category, categorySkills]) => (
                  <div key={category} className="mb-4">
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '15px', 
                      borderLeft: '4px solid #F79995',
                      marginBottom: '15px'
                    }}>
                      <h4 style={{ 
                        margin: '0', 
                        color: '#2c2c2c', 
                        fontSize: '1.2rem',
                        fontWeight: '400'
                      }}>
                        {category} ({categorySkills.length})
                      </h4>
                    </div>
                    {categorySkills.map(skill => (
                      <div key={skill.id} style={{ 
                        padding: '15px', 
                        backgroundColor: 'white',
                        border: '1px solid #eee',
                        marginBottom: '10px',
                        borderRadius: '4px'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px'
                        }}>
                          <h5 style={{ 
                            margin: '0', 
                            fontSize: '1rem',
                            color: '#2c2c2c'
                          }}>
                            {skill.name}
                          </h5>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#F79995',
                            fontWeight: 'bold'
                          }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '4px',
                          backgroundColor: '#eee',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <div style={{
                            width: `${skill.level}%`,
                            height: '100%',
                            backgroundColor: '#F79995',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                        <div>
                          <Button onClick={() => editSkill(skill)}>Editar</Button>
                          <Button variant="secondary" onClick={() => deleteSkill(skill.id)}>Eliminar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Otros tabs (header, about, etc.) - mantener igual que antes */}
        {activeTab === 'header' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3>Editar Header</h3>
              <FormInput label="Título Principal" name="main_title" value={header.main_title || ''} onChange={val => setHeader({ ...header, main_title: val })} />
              <FormInput label="Subtítulo" name="subtitle" value={header.subtitle || ''} onChange={val => setHeader({ ...header, subtitle: val })} />
              <FormInput label="Texto CTA" name="cta_text" value={header.cta_text || ''} onChange={val => setHeader({ ...header, cta_text: val })} />
              <FormInput label="LinkedIn URL" name="linkedin_url" value={header.linkedin_url || ''} onChange={val => setHeader({ ...header, linkedin_url: val })} />
              <FormInput label="Website URL" name="website_url" value={header.website_url || ''} onChange={val => setHeader({ ...header, website_url: val })} />
              <Button onClick={() => updateContent('header', header)}>Guardar Header</Button>
              <StatusMessage 
                message={status.message} 
                type={status.type} 
                onClose={() => setStatus({ message: '', type: '' })}
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3>Editar About</h3>
              <FormInput label="Título" name="title" value={about.title || ''} onChange={val => setAbout({ ...about, title: val })} />
              <FormInput label="Párrafo 1" name="paragraph_1" value={about.paragraph_1 || ''} onChange={val => setAbout({ ...about, paragraph_1: val })} />
              <FormInput label="Párrafo 2" name="paragraph_2" value={about.paragraph_2 || ''} onChange={val => setAbout({ ...about, paragraph_2: val })} />
              <Button onClick={() => updateContent('about', about)}>Guardar About</Button>
              <StatusMessage 
                message={status.message} 
                type={status.type} 
                onClose={() => setStatus({ message: '', type: '' })}
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3>Editar Contact</h3>
              <FormInput label="Título" name="title" value={contact.title || ''} onChange={val => setContact({ ...contact, title: val })} />
              <FormInput label="Email" name="email" value={contact.email || ''} type="email" onChange={val => setContact({ ...contact, email: val })} />
              <FormInput label="Website" name="website" value={contact.website || ''} onChange={val => setContact({ ...contact, website: val })} />
              <FormInput label="Ubicación" name="location" value={contact.location || ''} onChange={val => setContact({ ...contact, location: val })} />
              <FormInput label="LinkedIn" name="linkedin" value={contact.linkedin || ''} onChange={val => setContact({ ...contact, linkedin: val })} />
              <Button onClick={() => updateContent('contact', contact)}>Guardar Contact</Button>
              <StatusMessage 
                message={status.message} 
                type={status.type} 
                onClose={() => setStatus({ message: '', type: '' })}
              />
            </div>
          </div>
        )}

        {activeTab === 'footer' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3>Editar Footer</h3>
              <FormInput label="Nombre" name="name" value={footer.name || ''} onChange={val => setFooter({ ...footer, name: val })} />
              <FormInput label="Descripción" name="description" value={footer.description || ''} onChange={val => setFooter({ ...footer, description: val })} />
              <FormInput label="Texto de Ubicación" name="location_text" value={footer.location_text || ''} onChange={val => setFooter({ ...footer, location_text: val })} />
              <FormInput label="Texto de Especialidad" name="specialty_text" value={footer.specialty_text || ''} onChange={val => setFooter({ ...footer, specialty_text: val })} />
              <Button onClick={() => updateContent('footer', footer)}>Guardar Footer</Button>
              <StatusMessage 
                message={status.message} 
                type={status.type} 
                onClose={() => setStatus({ message: '', type: '' })}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;