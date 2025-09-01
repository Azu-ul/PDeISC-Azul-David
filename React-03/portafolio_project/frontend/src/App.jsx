import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import ChangePassword from './pages/ChangePassword'; // Importa
import ResetPassword from './pages/ResetPassword'; // Importa
import MiCuenta from './pages/MiCuenta'; // Importa el nuevo componente

function App() {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />
          
          {/* Rutas protegidas */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;