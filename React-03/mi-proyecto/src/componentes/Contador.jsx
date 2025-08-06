import React, { useState } from 'react';
import './Contador.css';
function Contador() {
  const [contador, setContador] = useState (0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);

  return (
    <div className='contador-container'>
      <h2>Contador: {contador}</h2>
      <button className='boton' onClick={decrementar}>-</button>
      <button className='boton' onClick={incrementar}>+</button>
    </div>
  );
}

export default Contador;