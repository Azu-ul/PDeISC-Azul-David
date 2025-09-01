import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "React", level: 85 },
        { name: "Bootstrap", level: 92 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 85 },
        { name: "PostgreSQL", level: 75 },
        { name: "API REST", level: 88 },
        { name: "JWT", level: 82 }
      ]
    },
    {
      title: "Herramientas",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Postman", level: 80 },
        { name: "Figma", level: 70 }
      ]
    }
  ];

  const ProgressBar = ({ skill }) => (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '15px'
      }}>
        <span style={{
          fontSize: '16px',
          color: '#2c2c2c',
          letterSpacing: '0.3px',
          fontWeight: '400'
        }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: '14px',
          color: '#999',
          letterSpacing: '0.5px'
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ 
        height: '1px', 
        backgroundColor: '#eee',
        position: 'relative'
      }}>
        <div 
          style={{ 
            width: `${skill.level}%`,
            height: '100%',
            backgroundColor: '#2c2c2c',
            transition: 'width 1s ease-in-out'
          }}
        />
      </div>
    </div>
  );

  const softSkills = [
    { name: "Resolución de Problemas", description: "Análisis y solución creativa de desafíos técnicos" },
    { name: "Trabajo en Equipo", description: "Colaboración efectiva en entornos ágiles" },
    { name: "Aprendizaje Continuo", description: "Actualización constante con nuevas tecnologías" },
    { name: "Gestión del Tiempo", description: "Organización y cumplimiento de deadlines" }
  ];

  return (
    <section 
      id="skills" 
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
            {/* Title Section */}
            <div className="text-center mb-5">
              <h2 
                className="display-4 fw-normal mb-5" 
                style={{ 
                  color: '#2c2c2c',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px',
                  marginBottom: '2rem'
                }}
              >
                Skills
              </h2>
              <p style={{ 
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6',
                letterSpacing: '0.3px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Technologies and tools I work with to create efficient and modern digital solutions.
              </p>
            </div>

            {/* Skills Categories */}
            <div className="row mb-5">
              {skillCategories.map((category, index) => (
                <div key={index} className="col-lg-4 mb-5">
                  <div style={{
                    backgroundColor: 'white',
                    padding: '50px 40px',
                    height: '100%',
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fafafa';
                    e.currentTarget.style.borderColor = '#e0e0e0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#f0f0f0';
                  }}>
                    <h3 style={{ 
                      fontSize: '20px',
                      fontWeight: '400',
                      color: '#2c2c2c',
                      marginBottom: '40px',
                      letterSpacing: '0.5px',
                      textAlign: 'center'
                    }}>
                      {category.title}
                    </h3>
                    <div>
                      {category.skills.map((skill, skillIndex) => (
                        <ProgressBar key={skillIndex} skill={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Soft Skills Section */}
            <div className="row mt-5 pt-5" style={{ borderTop: '1px solid #eee' }}>
              <div className="col-12">
                <div className="text-center mb-5">
                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '400',
                    color: '#2c2c2c',
                    marginBottom: '20px',
                    letterSpacing: '0.8px'
                  }}>
                    Additional Competencies
                  </h3>
                </div>

                <div className="row">
                  {softSkills.map((skill, index) => (
                    <div key={index} className="col-md-6 mb-4">
                      <div style={{ 
                        padding: '30px',
                        backgroundColor: 'white',
                        border: '1px solid #f5f5f5',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fafafa';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#f5f5f5';
                      }}>
                        <h4 style={{ 
                          fontSize: '18px',
                          fontWeight: '400',
                          color: '#2c2c2c',
                          marginBottom: '15px',
                          letterSpacing: '0.3px'
                        }}>
                          {skill.name}
                        </h4>
                        <p style={{ 
                          fontSize: '16px',
                          color: '#666',
                          marginBottom: '0',
                          lineHeight: '1.6',
                          letterSpacing: '0.2px'
                        }}>
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;