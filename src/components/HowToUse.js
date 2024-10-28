import React from 'react';
import './styles/HowToUse.css';

function HowToUse({ onClose }) {
  return (
    <div className="how-to-use-overlay">
      <div className="how-to-use-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>How to use</h2>
        <div className="instructions-container">
          <div className="left-column">
            <div className="instruction">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/resources/play-button-arrowhead.png`} alt="Start Icon" className="icon" />
              </div>
              <span>Start the sorting visualizer</span>
            </div>
            <div className="instruction">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/resources/pause.png`} alt="Pause Icon" className="icon" />
              </div>
              <span>Pause the sorting visualizer</span>
            </div>
            <div className="instruction">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/resources/next.png`} alt="Next Step Icon" className="icon" />
              </div>
              <span>Next step in the sorting process</span>
            </div>
            <div className="instruction">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/resources/next.png`} alt="Previous Step Icon" className="icon rotated" />
              </div>
              <span>Previous step in the sorting process</span>
            </div>
            <div className="instruction">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/resources/redo-arrow-symbol.png`} alt="Restart Icon" className="icon" />
              </div>
              <span>Restart the sorting visualizer</span>
            </div>
          </div>
          <div className="right-column">
            <div className="instruction">
              <div className="icon-container-stroke">
                <span className="styled-button">B</span>
              </div>
              <span>Change the notes scale: A, B, C, D, E, F, or G</span>
            </div>
            <div className="instruction">
              <div className="icon-container-stroke">
                <img src={`${process.env.PUBLIC_URL}/resources/guitar-instrument.png`} alt="Instrument Icon" className="icon" />
              </div>
              <span>Change the instrument playing</span>
            </div>
            <div className="instruction">
              <div className="icon-container-stroke">
                <span className="styled-button">1x</span>
              </div>
              <span>Change the speed of the visualizer</span>
            </div>
            <div className="instruction">
              <div className="icon-container-stroke">
                <img src={`${process.env.PUBLIC_URL}/resources/mute.png`} alt="Mute Icon" className="icon" />
              </div>
              <span>Use this button to mute the visualizer</span>
            </div>
            <div className="instruction">
              <div className="icon-container-stroke resource-button-example">
                <img src={`${process.env.PUBLIC_URL}/resources/wikipedia.png`} alt="Resource Icon" className="icon" />
              </div>
              <span>Resources to learn the algorithm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;