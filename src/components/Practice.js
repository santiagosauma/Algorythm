import React from 'react';
import TopBar from './TopBar';
import { useLocation } from 'react-router-dom';
import './styles/Practice.css';

function Practice() {
  const location = useLocation();
  const title = location.state?.fromGraphs ? 'Graphs - Exercises' : 'Practice - Exercises';

  return (
    <div className="practice-page">
      <TopBar />
      <div className="practice-content">
        <div className="header-row">
          <button className="back-button" onClick={() => window.history.back()}>
            <img src={process.env.PUBLIC_URL + '/resources/arrow.png'} alt="Go Back" className="arrow-back" />
          </button>
          <h1>{title}</h1>
        </div>
        <div className="coming-soon-container">
          <h2>Coming Soon . . .</h2>
        </div>
      </div>
    </div>
  );
}

export default Practice;
