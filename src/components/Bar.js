import React, { useEffect, useState } from 'react';
import './styles/Bar.css';

function Bar({ index, length, color, changeArray }) {
  const [len, setLen] = useState(length);

  useEffect(() => {
    setLen(length);
  }, [length]);

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === '') {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      if (val > 200) {
        setLen(200);
        changeArray(index, 200);
      } else {
        setLen(val);
        changeArray(index, val);
      }
    }
  };

  // Volume Buttons (Deactivated)

  /*
  const increment = () => {
    let newLen = len + 1;
    if (newLen > 200) newLen = 200;
    setLen(newLen);
    changeArray(index, newLen);
  };

  const decrement = () => {
    let newLen = len - 1;
    if (newLen < 0) newLen = 0;
    setLen(newLen);
    changeArray(index, newLen);
  };
  */

  return (
    <div className={`bar color-${color}`} style={{ '--bar-height': `${len}px` }}>
      <div className="side top"></div>
      <div className="side bottom"></div>
      <div className="side right">
        <div className="color-bar right-color-bar"></div>
      </div>
      <div className="side left">
        <div className="color-bar left-color-bar"></div>
      </div>
      <div className="side front">
        <div className="color-bar front-color-bar">
          <input
            type="number"
            value={len}
            className="input"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="side back">
        <div className="color-bar back-color-bar"></div>
      </div>
      
      {/*
      <div className="quantity-nav">
        <div className="quantity-button quantity-up" onClick={increment}>+</div>
        <div className="quantity-button quantity-down" onClick={decrement}>-</div>
      </div>
      */}
    </div>
  );
}

export default Bar;
