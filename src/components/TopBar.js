import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/resources/Algorythm.png'} alt="logo" className="logo" />
        <span className="title">Algorythm</span>
      </div>
      <div className="menu">
        <NavLink
          to="/sorts"
          className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
        >
          Sorts
        </NavLink>
        <NavLink
          to="/graphs"
          className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
        >
          Graphs
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
