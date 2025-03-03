import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBook, FaChartPie, FaArrowRight, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/LandingPage.css';

const LandingPage = () => {
  // Función para desplazarse a la sección de características
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-bg-circle-1"></div>
        <div className="hero-bg-circle-2"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Mejora tu Trading con Análisis Detallado</h1>
          <p className="hero-subtitle">
            Registra, analiza y optimiza tus operaciones de trading con nuestra plataforma integral de seguimiento y análisis.
          </p>
          
          <div className="hero-buttons">
            <Link to="/dashboard" className="hero-primary-button">
              Comenzar Ahora <FaArrowRight />
            </Link>
            <button className="hero-secondary-button">
              Saber Más
            </button>
          </div>
          
          <img 
            src="/images/trading-dashboard.png" 
            alt="Trading Dashboard" 
            className="hero-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>
      
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Características Principales</h2>
          <p className="section-subtitle">
            Herramientas diseñadas para ayudarte a mejorar tu rendimiento en el trading
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3 className="feature-title">Diario de Operaciones</h3>
              <p className="feature-description">
                Registra todas tus operaciones con detalles completos: entrada, salida, tamaño, razón y resultado.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartPie />
              </div>
              <h3 className="feature-title">Análisis de Rendimiento</h3>
              <p className="feature-description">
                Visualiza estadísticas clave como ratio de victorias, factor de beneficio y rendimiento por instrumento.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaBook />
              </div>
              <h3 className="feature-title">Diario de Aprendizaje</h3>
              <p className="feature-description">
                Documenta tus lecciones, ideas y estrategias para mejorar continuamente tu enfoque de trading.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">¿Listo para llevar tu trading al siguiente nivel?</h2>
          <p className="cta-description">
            Comienza a registrar y analizar tus operaciones hoy mismo para identificar patrones y mejorar tus resultados.
          </p>
          
          <Link to="/dashboard" className="cta-button">
            Comenzar Gratis <FaArrowRight />
          </Link>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">Trading Journal</div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">Características</a>
            <a href="#" className="footer-link">Precios</a>
            <a href="#" className="footer-link">Recursos</a>
            <a href="#" className="footer-link">Contacto</a>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaGithub />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
          
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Trading Journal. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 