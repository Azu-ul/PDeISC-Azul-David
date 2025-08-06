import React from 'react';
import HolaMundo from './componentes/HolaMundo';
import Tarjeta from './componentes/Tarjeta';
import Contador from './componentes/Contador';
import ListaDeTareas from './componentes/ListaDeTareas';
import Formulario from './componentes/Formulario';

function App() {
  return (
    <div className="app-container">
      <HolaMundo />
      <Tarjeta
        nombre="Azul Sofía"
        apellido="David"
        profesion="Estudiante de Informática"
        imagen="https://www.infobae.com/resizer/v2/COWPFPHQLVDYBH2FKOZ3WNXTLI.jpeg?auth=5e992eb09bc5e7ccd85a748cc952c4ba0a1cd8683dd1df08c1f94bc9b29d3a4d&smart=true&width=577&height=577&quality=85" />
      <Contador />
      <ListaDeTareas />
      <Formulario />
    </div>
  );
}

export default App;

