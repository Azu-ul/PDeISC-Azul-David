import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-vh-100 d-flex align-items-center justify-content-center' 
           style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" role="status" style={{ color: '#ba7b7c' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p style={{ color: '#8a5a5b' }}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}