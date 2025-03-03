import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // No mostrar la navbar en la página de inicio
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          Trading Journal
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/trades" 
              className={location.pathname === '/trades' ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Operaciones
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/learning" 
              className={location.pathname === '/learning' ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Aprendizaje
            </Link>
          </li>
          {/* Comentado hasta que esté implementado
          <li className="nav-item">
            <Link 
              to="/portfolio" 
              className={location.pathname === '/portfolio' ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Portfolio
            </Link>
          </li>
          */}
        </ul>

        <div className="user-menu">
          <div className="user-avatar" onClick={toggleDropdown}>
            <FaUser />
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/settings" className="dropdown-item">
                <FaCog /> Configuración
              </Link>
              <button className="dropdown-item">
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 