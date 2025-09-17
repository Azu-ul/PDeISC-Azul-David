import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context de autenticación
import { AuthProvider } from './pages/AuthContext';

// Componentes de autenticación
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './pages/ProtectedRoute';

// Componentes existentes
import Home from './pages/Home';
import CreateEdit from './pages/CreateEdit';
import Read from './pages/Read';
import Search from './pages/Search';

// Componente de no autorizado
const Unauthorized = () => (
  <div className='min-vh-100 d-flex align-items-center justify-content-center'
    style={{ background: 'linear-gradient(135deg, #d7a9a9 0%, #ba7b7c 100%)', fontFamily: "'Georgia', serif" }}>
    <div className="text-center">
      <i className="fas fa-exclamation-triangle fa-3x mb-3" style={{ color: '#ba7b7c' }}></i>
      <h3 style={{ color: '#8a5a5b' }}>Acceso No Autorizado</h3>
      <p style={{ color: '#9d6b6c' }}>No tienes permisos para acceder a esta página</p>
      <button
        onClick={() => window.history.back()}
        className="btn px-4 py-2 rounded-pill fw-semibold"
        style={{ backgroundColor: '#ba7b7c', color: 'white', border: 'none' }}
      >
        Volver
      </button>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/create" element={
            <ProtectedRoute adminOnly={true}>
              <CreateEdit />
            </ProtectedRoute>
          } />

          <Route path="/edit/:id" element={
            <ProtectedRoute adminOnly={true}>
              <CreateEdit />
            </ProtectedRoute>
          } />

          <Route path="/read" element={
            <ProtectedRoute adminOnly={true}>
              <Read />
            </ProtectedRoute>
          } />

          <Route path="/search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />

          {/* Redirigir rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}