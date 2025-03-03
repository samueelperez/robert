import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import '../styles/LandingPage.css';

// Importar las imágenes locales
import primeraImg from '../assets/images/primera.jpg';
import segundaImg from '../assets/images/segunda.jpg';
import terceraImg from '../assets/images/tercera.jpg';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Array de imágenes de fondo (usando las imágenes locales)
  const backgroundImages = [
    primeraImg,
    segundaImg,
    terceraImg
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
          <h1 className="logo-text">Trading Journal</h1>
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
            <span className="badge-text">10k+ Traders</span>
          </div>
          <div className="badge">
            <span className="badge-text">1M+ Operaciones</span>
          </div>
          <div className="badge">
            <span className="badge-text">98% Satisfacción</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 