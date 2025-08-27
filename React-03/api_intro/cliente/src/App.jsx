import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import CreateEdit from './pages/CreateEdit';
import Read from './pages/Read';
import Search from './pages/Search';

// Componente principal de la aplicación con rutas
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEdit />} />
        <Route path="/edit/:id" element={<CreateEdit />} />
        <Route path="/read" element={<Read />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}