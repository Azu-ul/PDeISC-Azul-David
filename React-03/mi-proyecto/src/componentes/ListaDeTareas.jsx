import React, { useState } from 'react';
import './ListaDeTareas.css';

function ListaDeTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      setTareas([...tareas, { 
        texto: nuevaTarea,
        completada: false }]);
      setNuevaTarea('');
    }
  };

  const marcarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada = !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  return (
    <div className="lista-container">
      <h2>Lista de Tareas</h2>
      <div className="entrada">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribí una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>
      <ul>
        {tareas.map((tarea, index) => (
          <li
            key={index}
            onClick={() => marcarCompletada(index)}
            className={tarea.completada ? 'completada' : ''}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTareas;
