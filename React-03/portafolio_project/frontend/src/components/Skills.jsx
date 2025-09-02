import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-white text-center">
        <div className="container">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#dc3545' }}>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const ProgressBar = ({ skill }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '30px' }}
    >
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
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{
            height: '100%',
            backgroundColor: '#F79995',
          }}
        />
      </div>
    </motion.div>
  );

  // Agrupar skills por categoría
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.parent_category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="py-5 bg-white"
      style={{
        fontFamily: 'Georgia, serif',
        minHeight: '100vh',
        paddingTop: '120px'
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
                  color: '#F79995',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '-1px',
                  marginBottom: '2rem'
                }}
              >
                Habilidades
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6',
                letterSpacing: '0.3px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Una visión general de mis competencias técnicas y profesionales
              </p>
            </div>

            {/* Skills Categories */}
            <div className="row mb-5">
              {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                <div key={index} className="col-lg-6 mb-5">
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
                      {category}
                    </h3>
                    <div>
                      {categorySkills.map((skill, skillIndex) => (
                        <ProgressBar key={skillIndex} skill={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;