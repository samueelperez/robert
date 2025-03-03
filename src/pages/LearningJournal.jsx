import React, { useState } from 'react';
import LearningEntryForm from '../components/learning/LearningEntryForm';
import LearningEntryList from '../components/learning/LearningEntryList';
import LearningStats from '../components/learning/LearningStats';
import VideoList from '../components/learning/VideoList';
import '../styles/VideoList.css';

const LearningJournal = () => {
  const [activeTab, setActiveTab] = useState('entries');
  
  return (
    <div className="learning-journal">
      <h2>Diario de Aprendizaje</h2>
      
      <div className="learning-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'entries' ? 'active' : ''}`}
            onClick={() => setActiveTab('entries')}
          >
            Entradas
          </button>
          <button 
            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
        
        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 'entries' ? 'active' : ''}`}>
            <div className="learning-layout">
              <div className="learning-main">
                <LearningEntryForm />
                <LearningEntryList />
              </div>
              <div className="learning-sidebar">
                <LearningStats />
              </div>
            </div>
          </div>
          
          <div className={`tab-panel ${activeTab === 'videos' ? 'active' : ''}`}>
            <h3>Videos de Aprendizaje</h3>
            <p>Completa estos videos para mejorar tus habilidades de trading.</p>
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningJournal; 