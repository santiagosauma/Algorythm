import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importar Router
import './index.css';
import reportWebVitals from './reportWebVitals';
import Landing from './landing';
import Sorts from './components/Sorts';

const svgPaths = [
  '/svg/note1.svg',
  '/svg/note2.svg',
  '/svg/note3.svg',
  '/svg/note4.svg',
  '/svg/note5.svg',
  '/svg/note6.svg',
  '/svg/note1.svg',
  '/svg/note2.svg',
  '/svg/note3.svg',
  '/svg/note4.svg',
  '/svg/note5.svg',
  '/svg/note6.svg',
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing svgPaths={svgPaths} />} /> {/* Ruta Landing */}
        <Route path="/sorts" element={<Sorts />} /> {/* Ruta Menu */}
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
