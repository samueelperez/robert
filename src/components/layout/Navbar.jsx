import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Trading Journal</Link>
      </div>
      <div className="nav-links">
        <Link to="/settings">Configuración</Link>
      </div>
    </nav>
  );
};

export default Navbar; 