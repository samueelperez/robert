import React from 'react';
import { Link } from 'react-router-dom';

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
      <header className="hero-section">
        <div className="hero-content">
          <h1>Trading Journal</h1>
          <p className="hero-subtitle">
            Registra, analiza y mejora tus operaciones de trading
          </p>
          <Link to="/dashboard" className="cta-button">
            Comenzar ahora →
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/trading-chart.svg" alt="Trading Chart" />
        </div>
        
        {/* Indicador de desplazamiento */}
        <div className="scroll-indicator" onClick={scrollToFeatures}>
          <span>Descubre más</span>
          <div className="scroll-arrow"></div>
        </div>
      </header>

      <section className="features-section" id="features">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              📈
            </div>
            <h3>Dashboard Interactivo</h3>
            <p>Visualiza tu rendimiento con gráficos interactivos y métricas en tiempo real.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              📝
            </div>
            <h3>Diario de Operaciones</h3>
            <p>Registra todas tus operaciones con detalles completos y notas personalizadas.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              📊
            </div>
            <h3>Análisis de Rendimiento</h3>
            <p>Analiza tu rendimiento con métricas avanzadas y descubre patrones en tus operaciones.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              🧠
            </div>
            <h3>Diario de Aprendizaje</h3>
            <p>Documenta tus lecciones y mantén un registro de tu evolución como trader.</p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Beneficios</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <h3>Mejora tu disciplina</h3>
            <p>Mantén un registro consistente de tus operaciones y decisiones.</p>
          </div>
          
          <div className="benefit-item">
            <h3>Identifica patrones</h3>
            <p>Descubre qué estrategias funcionan mejor para ti y en qué condiciones.</p>
          </div>
          
          <div className="benefit-item">
            <h3>Reduce errores emocionales</h3>
            <p>Registra tus emociones durante las operaciones y aprende a controlarlas.</p>
          </div>
          
          <div className="benefit-item">
            <h3>Evoluciona como trader</h3>
            <p>Visualiza tu progreso a lo largo del tiempo y celebra tus mejoras.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>¿Listo para mejorar tu trading?</h2>
        <p>Comienza a registrar y analizar tus operaciones hoy mismo.</p>
        <Link to="/dashboard" className="cta-button">
          Acceder a las herramientas →
        </Link>
      </section>
    </div>
  );
};

export default LandingPage; 