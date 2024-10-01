import React from 'react';
import './landing.scss';

function Landing({ svgPaths }) {
  return (
    <div className="Landing">
      <div className="wrap">
        {svgPaths.map((svgPath, index) => (
          <div key={index} className="svg-container">
            <img src={process.env.PUBLIC_URL + svgPath} alt={`svg-${index}`} className="svg" />
          </div>
        ))}
      </div>

      <header className="Landing-header">
        <h1 className="title">Algorythm</h1>
        <p className="description">
          Discover algorithms through interactive visuals and music, making learning both fun and engaging!
        </p>
        <button className="start-button">Start!</button>
      </header>
    </div>
  );
}

export default Landing;
