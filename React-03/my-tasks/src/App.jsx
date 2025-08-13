import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';
import { TasksProvider } from './context/TasksContext';

export default function App() {
  return (
    <TasksProvider>
      <div className="app-window min-vh-100 d-flex flex-column">
        <header className="win-titlebar shadow-sm">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="h5 m-0">🗂️ Tareas</h1>
            <nav className="nav gap-2">
              <NavLink to="/" className="btn btn-outline-light btn-sm">Inicio</NavLink>
              <NavLink to="/create" className="btn btn-light btn-sm">Crear</NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task/:id" element={<Detail />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<p>404 - Página no encontrada</p>} />
            </Routes>
          </div>
        </main>

        <footer className="win-statusbar text-center py-2">
          <small>Azul Sofía David</small>
        </footer>
      </div>
    </TasksProvider>
  );
}
