import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import './styles/Practice.css';

function Practice() {
  const navigate = useNavigate();

  return (
    <div className="practice-page">
      <TopBar />
      <div className="practice-content">
        <div className="header-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src={process.env.PUBLIC_URL + '/resources/arrow.png'} alt="Go Back" className="arrow-back" />
          </button>
          <h1>Practice - Exercises</h1>
        </div>
        <div className="coming-soon-container">
          <h2>Coming Soon . . .</h2>
        </div>
      </div>
    </div>
  );
}

export default Practice;
