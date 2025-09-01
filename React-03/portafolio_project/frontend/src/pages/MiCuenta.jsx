import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MiCuenta = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirige si no hay usuario logueado
      navigate('/login');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setMessage('Error al cargar los datos de la cuenta.');
      }
    };
    
    fetchUserData();
  }, [user, navigate]);

  if (!userData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Mi Cuenta</h2>
      {message && <p className="text-danger text-center">{message}</p>}
      <div className="card mx-auto mt-4" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h5 className="card-title">Datos Personales</h5>
          <hr />
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Apellido:</strong> {userData.apellido}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Rol:</strong> {userData.rol}</p>
          <hr />
          <button className="btn btn-primary" onClick={() => navigate('/change-password')}>
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;