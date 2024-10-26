import React from 'react';
import TopBar from './TopBar';
import './styles/ComingSoon.css';

function ComingSoon({ title }) {
  return (
    <div className="coming-soon-page">
      <TopBar />
      <div className="coming-soon-content">
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

export default ComingSoon;
