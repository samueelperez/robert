import React, { useState, useEffect } from 'react';
import { FaPlay, FaExternalLinkAlt } from 'react-icons/fa';
import '../../styles/YouTubePlaylist.css';

const YouTubePlaylist = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Datos de ejemplo para la lista de reproducción PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n
  const playlistData = [
    {
      id: 'video1',
      title: 'Introducción al Trading: Conceptos Básicos',
      thumbnail: '/images/video-thumbnails/trading-basics.jpg',
      description: 'Aprende los conceptos fundamentales del trading y los mercados financieros.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    },
    {
      id: 'video2',
      title: 'Análisis Técnico para Principiantes',
      thumbnail: '/images/video-thumbnails/technical-analysis.jpg',
      description: 'Descubre cómo utilizar el análisis técnico para tomar mejores decisiones de trading.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    },
    {
      id: 'video3',
      title: 'Estrategias de Trading para Mercados Volátiles',
      thumbnail: '/images/video-thumbnails/volatile-markets.jpg',
      description: 'Estrategias efectivas para operar en mercados con alta volatilidad.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    },
    {
      id: 'video4',
      title: 'Gestión del Riesgo en Trading',
      thumbnail: '/images/video-thumbnails/risk-management.jpg',
      description: 'Aprende a proteger tu capital con técnicas efectivas de gestión del riesgo.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    },
    {
      id: 'video5',
      title: 'Psicología del Trading: Mentalidad Ganadora',
      thumbnail: '/images/video-thumbnails/trading-psychology.jpg',
      description: 'Desarrolla una mentalidad adecuada para el éxito en el trading.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    },
    {
      id: 'video6',
      title: 'Patrones de Velas Japonesas',
      thumbnail: '/images/video-thumbnails/candlestick-patterns.jpg',
      description: 'Identifica y utiliza los patrones de velas japonesas más efectivos.',
      videoId: 'PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n'
    }
  ];

  useEffect(() => {
    // Simulamos la carga de datos
    setTimeout(() => {
      setVideos(playlistData);
      setLoading(false);
    }, 1000);
    
    // En un entorno real, aquí haríamos una llamada a la API de YouTube
    // const fetchPlaylistVideos = async () => {
    //   try {
    //     const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=YOUR_API_KEY`);
    //     const data = await response.json();
    //     setVideos(data.items);
    //   } catch (error) {
    //     console.error('Error fetching playlist:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchPlaylistVideos();
  }, [playlistId]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const openYouTubePlaylist = () => {
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="youtube-playlist-loading">
        <div className="loading-spinner"></div>
        <p>Cargando videos...</p>
      </div>
    );
  }

  return (
    <div className="youtube-playlist-container">
      <div className="playlist-header">
        <h3>Videos de Aprendizaje de Trading</h3>
        <button className="view-on-youtube" onClick={openYouTubePlaylist}>
          Ver en YouTube <FaExternalLinkAlt />
        </button>
      </div>

      <div className="playlist-content">
        <div className="video-list">
          {videos.map(video => (
            <div 
              key={video.id} 
              className={`video-item ${selectedVideo === video ? 'selected' : ''}`}
              onClick={() => handleVideoSelect(video)}
            >
              <div className="video-thumbnail">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/120x68?text=Video';
                  }}
                />
                <div className="play-icon">
                  <FaPlay />
                </div>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="video-player">
          {selectedVideo ? (
            <div className="player-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
            </div>
          ) : (
            <div className="player-placeholder">
              <div className="placeholder-content">
                <FaPlay className="placeholder-icon" />
                <p>Selecciona un video para comenzar a aprender</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubePlaylist; 