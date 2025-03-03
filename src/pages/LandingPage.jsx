import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, FaBook, FaChartPie, FaArrowRight, 
  FaGithub, FaTwitter, FaLinkedin, FaLightbulb,
  FaShieldAlt, FaRegChartBar, FaRegClock, FaUsers
} from 'react-icons/fa';
import '../styles/LandingPage.css';
import TradingChart from '../components/graphics/TradingChart';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    stats: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: false,
      stats: false,
      testimonials: false,
      cta: false
    });

    const handleScroll = () => {
      const sections = {
        features: document.querySelector('.features-section'),
        stats: document.querySelector('.stats-section'),
        testimonials: document.querySelector('.testimonials-section'),
        cta: document.querySelector('.cta-section')
      };

      const scrollPosition = window.scrollY + window.innerHeight * 0.75;

      Object.entries(sections).forEach(([key, section]) => {
        if (section && section.offsetTop <= scrollPosition) {
          setIsVisible(prev => ({ ...prev, [key]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section - Modern and Professional */}
      <section className="hero-section dark-gradient">
        <div className={`hero-content ${isVisible.hero ? 'fade-in' : ''}`}>
          <div className="hero-text-container">
            <h1 className="hero-title">
              <span className="gradient-text">Potencia</span> tu Trading con Análisis Avanzado
            </h1>
            <p className="hero-subtitle">
              Registra, analiza y optimiza tus operaciones con nuestra plataforma integral diseñada por traders para traders.
            </p>
            
            <div className="hero-buttons">
              <Link to="/dashboard" className="hero-primary-button">
                Comenzar Ahora <FaArrowRight />
              </Link>
              <button className="hero-secondary-button" onClick={scrollToFeatures}>
                Explorar Funciones
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10k+</span>
                <span className="hero-stat-label">Traders</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">1M+</span>
                <span className="hero-stat-label">Operaciones</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">98%</span>
                <span className="hero-stat-label">Satisfacción</span>
              </div>
            </div>
          </div>
          
          <div className="hero-chart-container">
            <div className="chart-wrapper">
              <TradingChart />
              <div className="chart-overlay"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section - Clean and Modern */}
      <section className="features-section">
        <div className={`features-container ${isVisible.features ? 'fade-in' : ''}`}>
          <div className="section-header">
            <h2 className="section-title">Características Diseñadas para <span className="gradient-text">Traders Exigentes</span></h2>
            <p className="section-subtitle">
              Herramientas avanzadas que te ayudarán a identificar patrones, mejorar tu disciplina y aumentar tu rentabilidad
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3 className="feature-title">Diario de Operaciones</h3>
              <p className="feature-description">
                Registra cada detalle de tus operaciones: entrada, salida, tamaño, razón y resultado. Adjunta capturas de pantalla para un análisis visual completo.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartPie />
              </div>
              <h3 className="feature-title">Análisis de Rendimiento</h3>
              <p className="feature-description">
                Visualiza métricas clave como ratio de victorias, factor de beneficio, drawdown y rendimiento por instrumento, sesión y estrategia.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaBook />
              </div>
              <h3 className="feature-title">Diario de Aprendizaje</h3>
              <p className="feature-description">
                Documenta tus lecciones, ideas y estrategias. Accede a recursos educativos seleccionados para mejorar continuamente tu enfoque de trading.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaLightbulb />
              </div>
              <h3 className="feature-title">Insights Personalizados</h3>
              <p className="feature-description">
                Recibe recomendaciones basadas en tus datos para identificar fortalezas, debilidades y oportunidades de mejora en tu estrategia.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3 className="feature-title">Gestión de Riesgo</h3>
              <p className="feature-description">
                Herramientas avanzadas para calcular el tamaño óptimo de posición, establecer límites de pérdidas y monitorear tu exposición al riesgo.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaRegChartBar />
              </div>
              <h3 className="feature-title">Reportes Avanzados</h3>
              <p className="feature-description">
                Genera informes detallados de tu actividad de trading para identificar patrones y tendencias a lo largo del tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className={`stats-container ${isVisible.stats ? 'fade-in' : ''}`}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">87%</div>
              <div className="stat-label">de usuarios mejoran su rentabilidad</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">32%</div>
              <div className="stat-label">reducción promedio en drawdown</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3.2x</div>
              <div className="stat-label">aumento en factor de beneficio</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">métricas de rendimiento</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className={`testimonials-container ${isVisible.testimonials ? 'fade-in' : ''}`}>
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros <span className="gradient-text">Usuarios</span></h2>
            <p className="section-subtitle">
              Traders de todo el mundo confían en nuestra plataforma para mejorar sus resultados
            </p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Desde que empecé a usar esta plataforma, mi disciplina de trading ha mejorado significativamente. Puedo ver claramente qué estrategias funcionan y cuáles no."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AM</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Alejandro Martínez</div>
                  <div className="testimonial-role">Trader de Forex</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"La función de análisis de rendimiento me ha ayudado a identificar patrones en mis operaciones que nunca hubiera notado. Mi factor de beneficio ha aumentado de 1.5 a 2.8."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">LR</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Laura Rodríguez</div>
                  <div className="testimonial-role">Day Trader</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"El diario de aprendizaje es una herramienta invaluable. Poder documentar mis ideas y lecciones ha acelerado mi curva de aprendizaje como trader."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">CS</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Carlos Sánchez</div>
                  <div className="testimonial-role">Trader de Criptomonedas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section dark-gradient">
        <div className={`cta-container ${isVisible.cta ? 'fade-in' : ''}`}>
          <h2 className="cta-title">¿Listo para transformar tu trading?</h2>
          <p className="cta-description">
            Únete a miles de traders que están mejorando sus resultados con nuestra plataforma
          </p>
          
          <div className="cta-features">
            <div className="cta-feature">
              <FaRegClock className="cta-feature-icon" />
              <span>Configuración en minutos</span>
            </div>
            <div className="cta-feature">
              <FaUsers className="cta-feature-icon" />
              <span>Soporte personalizado</span>
            </div>
            <div className="cta-feature">
              <FaShieldAlt className="cta-feature-icon" />
              <span>Datos 100% seguros</span>
            </div>
          </div>
          
          <Link to="/dashboard" className="cta-button">
            Comenzar Gratis <FaArrowRight />
          </Link>
          <p className="cta-note">No se requiere tarjeta de crédito</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">Trading Journal</div>
              <p className="footer-tagline">Elevando el rendimiento de los traders</p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </div>
            
            <div className="footer-links-container">
              <div className="footer-links-column">
                <h3 className="footer-links-title">Producto</h3>
                <ul className="footer-links">
                  <li><a href="#">Características</a></li>
                  <li><a href="#">Precios</a></li>
                  <li><a href="#">Testimonios</a></li>
                  <li><a href="#">Guías</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Recursos</h3>
                <ul className="footer-links">
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Tutoriales</a></li>
                  <li><a href="#">Webinars</a></li>
                  <li><a href="#">Comunidad</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Empresa</h3>
                <ul className="footer-links">
                  <li><a href="#">Sobre Nosotros</a></li>
                  <li><a href="#">Contacto</a></li>
                  <li><a href="#">Afiliados</a></li>
                  <li><a href="#">Empleo</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Legal</h3>
                <ul className="footer-links">
                  <li><a href="#">Términos</a></li>
                  <li><a href="#">Privacidad</a></li>
                  <li><a href="#">Cookies</a></li>
                  <li><a href="#">Licencias</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} Trading Journal. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 