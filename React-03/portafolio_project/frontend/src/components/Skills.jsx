import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "fas fa-laptop-code",
      color: "primary",
      skills: [
        { name: "HTML5", level: 95, icon: "fab fa-html5" },
        { name: "CSS3", level: 90, icon: "fab fa-css3-alt" },
        { name: "JavaScript", level: 88, icon: "fab fa-js-square" },
        { name: "React", level: 85, icon: "fab fa-react" },
        { name: "Bootstrap", level: 92, icon: "fab fa-bootstrap" }
      ]
    },
    {
      title: "Backend",
      icon: "fas fa-server",
      color: "success",
      skills: [
        { name: "Node.js", level: 80, icon: "fab fa-node-js" },
        { name: "Express.js", level: 85, icon: "fas fa-code" },
        { name: "PostgreSQL", level: 75, icon: "fas fa-database" },
        { name: "API REST", level: 88, icon: "fas fa-plug" },
        { name: "JWT", level: 82, icon: "fas fa-key" }
      ]
    },
    {
      title: "Herramientas",
      icon: "fas fa-tools",
      color: "warning",
      skills: [
        { name: "Git", level: 90, icon: "fab fa-git-alt" },
        { name: "GitHub", level: 85, icon: "fab fa-github" },
        { name: "VS Code", level: 95, icon: "fas fa-code" },
        { name: "Postman", level: 80, icon: "fas fa-paper-plane" },
        { name: "Figma", level: 70, icon: "fab fa-figma" }
      ]
    }
  ];

  const ProgressBar = ({ skill }) => (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="d-flex align-items-center">
          <i className={`${skill.icon} me-2 text-muted`}></i>
          {skill.name}
        </span>
        <span className="fw-semibold">{skill.level}%</span>
      </div>
      <div className="progress" style={{ height: '8px' }}>
        <div 
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${skill.level}%` }}
          aria-valuenow={skill.level}
          aria-valuemin="0"
          aria-valuemax="100"
        >
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">Habilidades Técnicas</h2>
          <div className="bg-warning" style={{ height: '4px', width: '80px', margin: '0 auto' }}></div>
          <p className="lead text-muted mt-3 col-lg-8 mx-auto">
            Estas son las tecnologías y herramientas con las que trabajo día a día 
            para crear soluciones digitales eficientes y modernas.
          </p>
        </div>

        <div className="row">
          {skillCategories.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className={`card-header bg-${category.color} text-white text-center py-3`}>
                  <i className={`${category.icon} fa-2x mb-2`}></i>
                  <h4 className="mb-0">{category.title}</h4>
                </div>
                <div className="card-body p-4">
                  {category.skills.map((skill, skillIndex) => (
                    <ProgressBar key={skillIndex} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="text-center mb-4">Otras Competencias</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Resolución de Problemas</h5>
                    <p className="text-muted mb-0">Análisis y solución creativa de desafíos técnicos</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Trabajo en Equipo</h5>
                    <p className="text-muted mb-0">Colaboración efectiva en entornos ágiles</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-warning rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-rocket text-white"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Aprendizaje Continuo</h5>
                    <p className="text-muted mb-0">Actualización constante con nuevas tecnologías</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-danger rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-clock text-white"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Gestión del Tiempo</h5>
                    <p className="text-muted mb-0">Organización y cumplimiento de deadlines</p>
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

export default Skills;