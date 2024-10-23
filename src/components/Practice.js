import React from 'react';
import TopBar from './TopBar';
import './styles/Practice.css';

function Practice() {
  return (
    <div className="practice-page">
      <TopBar />
      <div className="practice-content">
        <h1>Practice - Exercises</h1>
        <div className="coming-soon-container">
          <h2>Coming Soon...</h2>
        </div>
      </div>
    </div>
  );
}

export default Practice;
