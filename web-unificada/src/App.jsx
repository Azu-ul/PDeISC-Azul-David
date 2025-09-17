import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Project1 from './Project1/App';
import Project2 from './Project2/App';

function App() {
  return (
    <Router>
      <div>
        <h1>Página Principal</h1>
        <nav>
          <Link to="/project1">Ir a Proyecto 1</Link>
          <br/>
          <Link to="/project2">Ir a Proyecto 2</Link>
        </nav>

        <Routes>
          <Route path="/project1" element={<Project1 />} />
          <Route path="/project2" element={<Project2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
