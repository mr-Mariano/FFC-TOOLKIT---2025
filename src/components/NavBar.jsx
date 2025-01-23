import React from 'react';
import { Link } from 'react-router';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/page1" className="navbar-button">Mariano</Link></li>
        <li><Link to="/page2" className="navbar-button">German</Link></li>
        <li><Link to="/page3" className="navbar-button">Oscar</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;