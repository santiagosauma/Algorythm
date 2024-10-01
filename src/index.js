import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Landing from './landing';

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
    <Landing svgPaths={svgPaths} />
  </React.StrictMode>,
);


reportWebVitals();
