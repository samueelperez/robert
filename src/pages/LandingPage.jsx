import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import '../styles/LandingPage.css';
import TradingChart from '../components/graphics/TradingChart';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Array de imágenes de fondo (puedes reemplazar estas URLs con tus propias imágenes)
  const backgroundImages = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1642790551116-18e150f248e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80'
  ];

  // Efecto para cambiar la imagen de fondo cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setFadeIn(true);
      }, 1000); // Tiempo de transición de desvanecimiento
    }, 6000); // Tiempo total entre cambios de imagen

    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-fullscreen">
      {/* Header/Navbar */}
      <header className="main-header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#journal">Diario</a></li>
            <li><a href="#analytics">Análisis</a></li>
            <li><a href="#learning">Aprendizaje</a></li>
            <li><a href="#about">Acerca de</a></li>
          </ul>
        </nav>
        <div className="nav-buttons">
          <Link to="/login" className="login-button">Iniciar Sesión</Link>
          <Link to="/dashboard" className="signup-button">Registrarse</Link>
        </div>
      </header>

      {/* Hero Section con Imágenes de Fondo */}
      <section className="hero-fullscreen">
        <div 
          className={`background-image ${fadeIn ? 'fade-in' : 'fade-out'}`} 
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
        ></div>
        <div className="overlay"></div>
        
        <div className="hero-content-centered">
          <div className="hero-text-container">
            <div className="vertical-line"></div>
            <div className="hero-text">
              <h1 className="hero-title-large">
                TRADING
                <br />
                JOURNAL
                <br />
                PRO
              </h1>
              <p className="hero-subtitle-large">
                Registra, analiza y optimiza tus operaciones
              </p>
              <div className="hero-buttons-centered">
                <Link to="/dashboard" className="hero-button-primary">
                  Comenzar Ahora <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logos o badges en la parte inferior */}
        <div className="bottom-badges">
          <div className="badge">
            <img src="https://via.placeholder.com/120x60?text=Badge1" alt="Badge 1" />
          </div>
          <div className="badge">
            <img src="https://via.placeholder.com/120x60?text=Badge2" alt="Badge 2" />
          </div>
          <div className="badge">
            <img src="https://via.placeholder.com/120x60?text=Badge3" alt="Badge 3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 