import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Create from './pages/Create';
import Read from './pages/Read';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}
