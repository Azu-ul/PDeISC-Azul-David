import React, { useState } from 'react';
import './Formulario.css';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const validarNombre = (texto) => {
    // Solo letras mayúsculas, minúsculas y espacios
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    return regex.test(texto);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (nombre.trim() === '') {
      setMensaje('Por favor, ingresá tu nombre.');
    } else if (!validarNombre(nombre.trim())) {
      setMensaje('El nombre no puede contener números ni símbolos.');
    } else {
      setMensaje(`¡Bienvenido, ${nombre.trim()}!`);
      setNombre('');
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Ingresá tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Formulario;
