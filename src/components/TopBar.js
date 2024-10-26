import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './styles/TopBar.css';

function TopBar() {
  const location = useLocation();

  const isSortsPage = location.pathname.startsWith('/sorts') || location.pathname.startsWith('/sortdetails');
  const isGraphsPage = location.pathname.startsWith('/graphs') || location.pathname === '/practice';

  return (
    <div className="top-bar">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/resources/Algorythm.png'} alt="logo" className="logo" />
        <span className="Top-bar-title">Algorythm</span>
      </div>
      <div className="menu">
        <NavLink
          to="/sorts"
          className={isSortsPage ? 'menu-item active' : 'menu-item'}
        >
          Sorts
        </NavLink>
        <NavLink
          to="/graphs"
          className={isGraphsPage ? 'menu-item active' : 'menu-item'}
        >
          Graphs
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
