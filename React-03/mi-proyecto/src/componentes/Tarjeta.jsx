import React from "react";
import './Tarjeta.css';

function Tarjeta(
  {
  nombre,
  apellido,
  profesion, 
  imagen
  }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt="Foto de perfil" className="tarjeta-imagen" />
      <h2 className="tarjeta-nombre">{nombre} {apellido}</h2>
      <p className="tarjeta-profesion">{profesion}</p>
    </div>
  );
}

export default Tarjeta;