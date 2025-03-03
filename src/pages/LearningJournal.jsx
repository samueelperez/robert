import React, { useState, useEffect } from 'react';
import { FaVideo, FaPlay } from 'react-icons/fa';
import '../styles/LearningJournal.css';

const LearningJournal = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Lista de videos del curso de trading
  const tradingCourseVideos = [
    {
      id: 'video1',
      title: 'Introducción al Trading',
      description: 'Conceptos básicos y fundamentos del trading',
      thumbnail: 'https://i.ytimg.com/vi/7I-NspXxHEE/maxresdefault.jpg',
      videoId: '7I-NspXxHEE'
    },
    {
      id: 'video2',
      title: 'Análisis Técnico',
      description: 'Aprende a leer gráficos y patrones de precio',
      thumbnail: 'https://i.ytimg.com/vi/Ql6GCi5Hx0E/maxresdefault.jpg',
      videoId: 'Ql6GCi5Hx0E'
    },
    {
      id: 'video3',
      title: 'Gestión del Riesgo',
      description: 'Estrategias para proteger tu capital',
      thumbnail: 'https://i.ytimg.com/vi/3wO_PukhHCQ/maxresdefault.jpg',
      videoId: '3wO_PukhHCQ'
    },
    {
      id: 'video4',
      title: 'Psicología del Trading',
      description: 'Mentalidad y disciplina para el éxito',
      thumbnail: 'https://i.ytimg.com/vi/7I-NspXxHEE/maxresdefault.jpg',
      videoId: '7I-NspXxHEE'
    },
    {
      id: 'video5',
      title: 'Estrategias de Trading',
      description: 'Diferentes enfoques para operar en los mercados',
      thumbnail: 'https://i.ytimg.com/vi/Ql6GCi5Hx0E/maxresdefault.jpg',
      videoId: 'Ql6GCi5Hx0E'
    }
  ];

  // Función para reproducir un video
  const playVideo = (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Habilitar el scroll cuando se monte este componente
  useEffect(() => {
    // Añadir clase específica al body y html
    document.body.classList.add('learning-page');
    document.documentElement.classList.add('learning-page');
    
    // Establecer overflow explícitamente
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    
    // Eliminar cualquier posición fija que pueda estar interfiriendo
    document.body.style.position = 'relative';
    
    // Limpiar al desmontar
    return () => {
      document.body.classList.remove('learning-page');
      document.documentElement.classList.remove('learning-page');
      
      // No restauramos los estilos originales para evitar conflictos
      // con la página de inicio que requiere overflow: hidden
    };
  }, []);

  return (
    <div className="learning-journal-wrapper">
      <div className="learning-journal-container">
        {/* Encabezado */}
        <div className="learning-header">
          <h1>Curso de Trading desde Cero</h1>
          <p>Aprende los fundamentos del trading con esta serie de videos</p>
        </div>

        {/* Reproductor de video principal */}
        <div className="video-player-section">
          {selectedVideo ? (
            <div className="video-player-container">
              <div className="video-player-wrapper">
                <iframe
                  className="video-player"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h2>{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          ) : (
            <div className="video-player-container">
              <div className="video-player-wrapper">
                <iframe
                  className="video-player"
                  src={`https://www.youtube.com/embed/videoseries?list=PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n&rel=0`}
                  title="Curso de Trading desde Cero"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h2>Curso de Trading desde Cero</h2>
                <p>Comienza tu viaje en el mundo del trading con esta completa serie de videos</p>
              </div>
            </div>
          )}
        </div>

        {/* Lista de videos */}
        <div className="video-list-section">
          <h2>Videos del Curso</h2>
          <div className="video-grid">
            {tradingCourseVideos.map((video) => (
              <div 
                key={video.id} 
                className={`video-card ${selectedVideo && selectedVideo.id === video.id ? 'active' : ''}`}
                onClick={() => playVideo(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-button">
                    <FaPlay />
                  </div>
                </div>
                <div className="video-card-content">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="video-card-footer">
                    <span className="video-type"><FaVideo /> Video</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de lista de reproducción completa */}
        <div className="playlist-section">
          <div className="playlist-header">
            <h2>Lista de Reproducción Completa</h2>
            <p>Accede a la lista completa de videos en YouTube</p>
          </div>
          <a 
            href="https://youtube.com/playlist?list=PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n" 
            target="_blank" 
            rel="noopener noreferrer"
            className="playlist-button"
          >
            Ver Lista Completa en YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearningJournal; 