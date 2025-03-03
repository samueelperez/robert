import React, { useState, useEffect } from 'react';
import { FaPlay, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';
import YouTube from 'react-youtube';
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
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      description: 'Aprende los conceptos fundamentales del trading y los mercados financieros.',
      videoId: 'dQw4w9WgXcQ' // ID de video individual, no ID de playlist
    },
    {
      id: 'video2',
      title: 'Análisis Técnico para Principiantes',
      thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
      description: 'Descubre cómo utilizar el análisis técnico para tomar mejores decisiones de trading.',
      videoId: '9bZkp7q19f0'
    },
    {
      id: 'video3',
      title: 'Estrategias de Trading para Mercados Volátiles',
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
      description: 'Estrategias efectivas para operar en mercados con alta volatilidad.',
      videoId: 'JGwWNGJdvx8'
    },
    {
      id: 'video4',
      title: 'Gestión del Riesgo en Trading',
      thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
      description: 'Aprende a proteger tu capital con técnicas efectivas de gestión del riesgo.',
      videoId: 'kJQP7kiw5Fk'
    },
    {
      id: 'video5',
      title: 'Psicología del Trading: Mentalidad Ganadora',
      thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg',
      description: 'Desarrolla una mentalidad adecuada para el éxito en el trading.',
      videoId: 'RgKAFK5djSk'
    },
    {
      id: 'video6',
      title: 'Patrones de Velas Japonesas',
      thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
      description: 'Identifica y utiliza los patrones de velas japonesas más efectivos.',
      videoId: 'fJ9rUzIMcZQ'
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

  const openYouTubeVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
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
              onClick={() => openYouTubeVideo(video.videoId)}
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
          <div className="player-placeholder">
            <div className="placeholder-content">
              <FaYoutube className="placeholder-icon" style={{ color: '#FF0000', fontSize: '4rem' }} />
              <p>Haz clic en cualquier video para verlo en YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlaylist; 