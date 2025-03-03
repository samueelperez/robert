import React, { useState, useEffect } from 'react';
import { FaBook, FaVideo, FaChartLine, FaSearch, FaFilter, FaBookmark, FaStar, FaClock, FaEye, FaCalendarAlt } from 'react-icons/fa';
import YouTubePlaylist from '../components/learning/YouTubePlaylist';
import '../styles/LearningJournal.css';

const LearningJournal = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    nivel: 'todos',
    categoria: 'todos',
    duracion: 'todos',
    valoracion: 'todos'
  });
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredResource, setFeaturedResource] = useState(null);

  // Función para obtener el icono según el tipo de recurso
  const getTypeIcon = (type) => {
    switch (type) {
      case 'articulo':
        return <FaBook className="resource-type-icon article" />;
      case 'video':
        return <FaVideo className="resource-type-icon video" />;
      case 'curso':
        return <FaChartLine className="resource-type-icon course" />;
      default:
        return null;
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Resetear todos los filtros
  const resetFilters = () => {
    setSearchTerm('');
    setActiveTab('todos');
    setFilters({
      nivel: 'todos',
      categoria: 'todos',
      duracion: 'todos',
      valoracion: 'todos'
    });
  };

  // Datos de ejemplo para recursos de aprendizaje
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const dummyResources = [
        {
          id: 1,
          title: 'Fundamentos del Análisis Técnico',
          type: 'articulo',
          description: 'Aprende los conceptos básicos del análisis técnico para identificar tendencias y patrones en los gráficos.',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'principiante',
          category: 'analisis-tecnico',
          duration: '15 min',
          rating: 4.8,
          views: 1250,
          date: '2023-10-15',
          featured: true
        },
        {
          id: 2,
          title: 'Estrategias de Trading para Mercados Volátiles',
          type: 'video',
          description: 'Descubre cómo adaptar tus estrategias de trading para aprovechar la volatilidad del mercado.',
          image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'intermedio',
          category: 'estrategias',
          duration: '28 min',
          rating: 4.6,
          views: 980,
          date: '2023-09-22',
          featured: false
        },
        {
          id: 3,
          title: 'Gestión del Riesgo en Trading',
          type: 'curso',
          description: 'Un curso completo sobre cómo gestionar el riesgo para proteger tu capital y maximizar tus ganancias.',
          image: 'https://images.unsplash.com/photo-1642790551116-18e150f248e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'avanzado',
          category: 'gestion-riesgo',
          duration: '3 horas',
          rating: 4.9,
          views: 2150,
          date: '2023-08-10',
          featured: true
        },
        {
          id: 4,
          title: 'Indicadores Técnicos Esenciales',
          type: 'articulo',
          description: 'Guía completa de los indicadores técnicos más utilizados y cómo interpretarlos correctamente.',
          image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'principiante',
          category: 'indicadores',
          duration: '20 min',
          rating: 4.5,
          views: 1560,
          date: '2023-10-05',
          featured: false
        },
        {
          id: 5,
          title: 'Psicología del Trading',
          type: 'video',
          description: 'Descubre cómo la psicología afecta tus decisiones de trading y cómo mantener una mentalidad ganadora.',
          image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'intermedio',
          category: 'psicologia',
          duration: '35 min',
          rating: 4.7,
          views: 1890,
          date: '2023-09-18',
          featured: true
        },
        {
          id: 6,
          title: 'Análisis Fundamental para Traders',
          type: 'curso',
          description: 'Aprende a analizar los fundamentos económicos que mueven los mercados financieros.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'avanzado',
          category: 'analisis-fundamental',
          duration: '4 horas',
          rating: 4.8,
          views: 1320,
          date: '2023-07-25',
          featured: false
        },
        {
          id: 7,
          title: 'Patrones de Velas Japonesas',
          type: 'articulo',
          description: 'Guía completa de los patrones de velas japonesas más efectivos para tus operaciones.',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'principiante',
          category: 'patrones',
          duration: '18 min',
          rating: 4.6,
          views: 2050,
          date: '2023-10-12',
          featured: false
        },
        {
          id: 8,
          title: 'Trading Algorítmico: Primeros Pasos',
          type: 'video',
          description: 'Introducción al trading algorítmico y cómo empezar a automatizar tus estrategias.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
          level: 'avanzado',
          category: 'algoritmico',
          duration: '42 min',
          rating: 4.9,
          views: 1780,
          date: '2023-08-30',
          featured: true
        }
      ];

      setResources(dummyResources);
      setFilteredResources(dummyResources);
      setFeaturedResource(dummyResources.find(resource => resource.featured && resource.id === 3));
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar recursos cuando cambian los filtros o la búsqueda
  useEffect(() => {
    if (resources.length === 0) return;

    let filtered = [...resources];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo (tab)
    if (activeTab !== 'todos') {
      filtered = filtered.filter(resource => resource.type === activeTab);
    }

    // Aplicar filtros adicionales
    if (filters.nivel !== 'todos') {
      filtered = filtered.filter(resource => resource.level === filters.nivel);
    }

    if (filters.categoria !== 'todos') {
      filtered = filtered.filter(resource => resource.category === filters.categoria);
    }

    if (filters.duracion !== 'todos') {
      switch (filters.duracion) {
        case 'corto':
          filtered = filtered.filter(resource => {
            const minutes = parseInt(resource.duration);
            return !isNaN(minutes) && minutes < 30;
          });
          break;
        case 'medio':
          filtered = filtered.filter(resource => {
            const minutes = parseInt(resource.duration);
            return !isNaN(minutes) && minutes >= 30 && minutes <= 60;
          });
          break;
        case 'largo':
          filtered = filtered.filter(resource => {
            const hours = resource.duration.includes('hora');
            return hours;
          });
          break;
        default:
          break;
      }
    }

    if (filters.valoracion !== 'todos') {
      const minRating = parseFloat(filters.valoracion);
      filtered = filtered.filter(resource => resource.rating >= minRating);
    }

    setFilteredResources(filtered);
  }, [searchTerm, activeTab, filters, resources]);

  return (
    <div className="learning-journal-container">
      {/* Hero Section */}
      <div className="learning-hero">
        <div className="learning-hero-content">
          <h1>Centro de Aprendizaje de Trading</h1>
          <p>Explora nuestra colección de recursos para mejorar tus habilidades de trading</p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar recursos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="filter-button"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FaFilter /> Filtros
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters Panel */}
      <div className={`filters-panel ${filterOpen ? 'open' : ''}`}>
        <div className="filters-header">
          <h3>Filtrar recursos</h3>
          <button className="reset-filters" onClick={resetFilters}>Restablecer filtros</button>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Nivel</label>
            <select 
              value={filters.nivel} 
              onChange={(e) => handleFilterChange('nivel', e.target.value)}
            >
              <option value="todos">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Categoría</label>
            <select 
              value={filters.categoria} 
              onChange={(e) => handleFilterChange('categoria', e.target.value)}
            >
              <option value="todos">Todas las categorías</option>
              <option value="analisis-tecnico">Análisis Técnico</option>
              <option value="estrategias">Estrategias</option>
              <option value="gestion-riesgo">Gestión de Riesgo</option>
              <option value="indicadores">Indicadores</option>
              <option value="psicologia">Psicología</option>
              <option value="analisis-fundamental">Análisis Fundamental</option>
              <option value="patrones">Patrones</option>
              <option value="algoritmico">Trading Algorítmico</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Duración</label>
            <select 
              value={filters.duracion} 
              onChange={(e) => handleFilterChange('duracion', e.target.value)}
            >
              <option value="todos">Cualquier duración</option>
              <option value="corto">Corto (&lt; 30 min)</option>
              <option value="medio">Medio (30-60 min)</option>
              <option value="largo">Largo (&gt; 1 hora)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Valoración</label>
            <select 
              value={filters.valoracion} 
              onChange={(e) => handleFilterChange('valoracion', e.target.value)}
            >
              <option value="todos">Cualquier valoración</option>
              <option value="4.5">4.5+ estrellas</option>
              <option value="4">4+ estrellas</option>
              <option value="3.5">3.5+ estrellas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="learning-content">
        {/* Featured Resource */}
        {featuredResource && (
          <section className="featured-resource">
            <div className="featured-resource-image" style={{ backgroundImage: `url(${featuredResource.image})` }}>
              <div className="featured-badge">Destacado</div>
            </div>
            <div className="featured-resource-content">
              <div className="featured-resource-type">
                {getTypeIcon(featuredResource.type)}
                <span className="resource-type-label">
                  {featuredResource.type === 'articulo' ? 'Artículo' : 
                   featuredResource.type === 'video' ? 'Video' : 'Curso'}
                </span>
              </div>
              <h2>{featuredResource.title}</h2>
              <p>{featuredResource.description}</p>
              <div className="featured-resource-meta">
                <span className="resource-level">{featuredResource.level === 'principiante' ? 'Principiante' : 
                                                 featuredResource.level === 'intermedio' ? 'Intermedio' : 'Avanzado'}</span>
                <span className="resource-duration"><FaClock /> {featuredResource.duration}</span>
                <span className="resource-rating"><FaStar /> {featuredResource.rating}</span>
                <span className="resource-views"><FaEye /> {featuredResource.views}</span>
              </div>
              <button className="featured-resource-button">Ver Recurso</button>
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="resource-tabs">
          <button 
            className={`tab-button ${activeTab === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            Todos
          </button>
          <button 
            className={`tab-button ${activeTab === 'articulo' ? 'active' : ''}`}
            onClick={() => setActiveTab('articulo')}
          >
            <FaBook /> Artículos
          </button>
          <button 
            className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <FaVideo /> Videos
          </button>
          <button 
            className={`tab-button ${activeTab === 'curso' ? 'active' : ''}`}
            onClick={() => setActiveTab('curso')}
          >
            <FaChartLine /> Cursos
          </button>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando recursos...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <div className="resource-card" key={resource.id}>
                <div className="resource-image" style={{ backgroundImage: `url(${resource.image})` }}>
                  <button className="bookmark-button">
                    <FaBookmark />
                  </button>
                  {getTypeIcon(resource.type)}
                </div>
                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="resource-meta">
                    <span className="resource-level">{resource.level === 'principiante' ? 'Principiante' : 
                                                     resource.level === 'intermedio' ? 'Intermedio' : 'Avanzado'}</span>
                    <span className="resource-duration"><FaClock /> {resource.duration}</span>
                  </div>
                  <div className="resource-footer">
                    <div className="resource-rating">
                      <FaStar /> {resource.rating}
                    </div>
                    <span className="resource-date"><FaCalendarAlt /> {resource.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No se encontraron recursos</h3>
            <p>Intenta con otros términos de búsqueda o filtros</p>
            <button className="reset-search" onClick={resetFilters}>Restablecer búsqueda</button>
          </div>
        )}

        {/* YouTube Playlist Section */}
        {activeTab === 'todos' || activeTab === 'video' ? (
          <section className="youtube-section">
            <h2>Curso de Trading desde Cero</h2>
            <p>Aprende los fundamentos del trading con este curso completo</p>
            <YouTubePlaylist playlistId="PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n" />
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default LearningJournal; 