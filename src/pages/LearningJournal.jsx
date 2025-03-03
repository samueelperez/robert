import React, { useState } from 'react';
import { FaPlus, FaBook, FaVideo } from 'react-icons/fa';
import '../styles/LearningJournal.css';
import YouTubePlaylist from '../components/learning/YouTubePlaylist';

const LearningJournal = () => {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Estrategia de Ruptura de Rango',
      content: 'Hoy aprendí sobre la estrategia de ruptura de rango. Funciona mejor en mercados que han estado en consolidación y luego muestran un movimiento fuerte en una dirección.',
      date: '2023-05-15',
      tags: ['estrategia', 'ruptura']
    },
    {
      id: 2,
      title: 'Gestión del Riesgo',
      content: 'Nunca arriesgar más del 2% del capital en una operación. Establecer stop loss antes de entrar al mercado.',
      date: '2023-05-10',
      tags: ['riesgo', 'gestión']
    }
  ]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value
    });
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    
    const tagsArray = newNote.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    const noteToAdd = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split('T')[0],
      tags: tagsArray
    };
    
    setNotes([noteToAdd, ...notes]);
    setNewNote({
      title: '',
      content: '',
      tags: ''
    });
    setShowNoteForm(false);
  };

  return (
    <div className="learning-journal-container">
      <div className="learning-journal-header">
        <h2>Diario de Aprendizaje</h2>
        
        <div className="learning-tabs">
          <button 
            className={activeTab === 'notes' ? 'active' : ''}
            onClick={() => handleTabChange('notes')}
          >
            <FaBook /> Notas
          </button>
          <button 
            className={activeTab === 'videos' ? 'active' : ''}
            onClick={() => handleTabChange('videos')}
          >
            <FaVideo /> Videos
          </button>
        </div>
      </div>
      
      {activeTab === 'notes' && (
        <div className="notes-section">
          <div className="notes-header">
            <h3>Mis Notas de Aprendizaje</h3>
            <button 
              className="add-note-btn"
              onClick={() => setShowNoteForm(!showNoteForm)}
            >
              <FaPlus /> {showNoteForm ? 'Cancelar' : 'Nueva Nota'}
            </button>
          </div>
          
          {showNoteForm && (
            <div className="note-form-container">
              <form onSubmit={handleNoteSubmit} className="note-form">
                <div className="form-group">
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newNote.title}
                    onChange={handleNoteChange}
                    required
                    placeholder="Título de la nota"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="content">Contenido</label>
                  <textarea
                    id="content"
                    name="content"
                    value={newNote.content}
                    onChange={handleNoteChange}
                    required
                    placeholder="Escribe tu nota aquí..."
                    rows="6"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="tags">Etiquetas (separadas por comas)</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={newNote.tags}
                    onChange={handleNoteChange}
                    placeholder="estrategia, riesgo, análisis"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={() => setShowNoteForm(false)} className="cancel-btn">
                    Cancelar
                  </button>
                  <button type="submit" className="save-btn">
                    Guardar Nota
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <span className="note-date">{note.date}</span>
                  </div>
                  <p className="note-content">{note.content}</p>
                  <div className="note-tags">
                    {note.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-notes">
                <p>No hay notas de aprendizaje. ¡Crea tu primera nota!</p>
                <button onClick={() => setShowNoteForm(true)}>
                  <FaPlus /> Nueva Nota
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'videos' && (
        <div className="videos-section">
          <YouTubePlaylist playlistId="PLxgpCi8eq8Rk8QCbnRO3w0BSuYLfS1j8n" />
        </div>
      )}
    </div>
  );
};

export default LearningJournal; 