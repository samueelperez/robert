import React, { useState } from 'react';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import AssetList from '../components/portfolio/AssetList';
import AssetForm from '../components/portfolio/AssetForm';
import PortfolioDistribution from '../components/portfolio/PortfolioDistribution';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('summary');
  
  return (
    <div className="portfolio-page">
      <h2>Mi Portfolio</h2>
      
      <div className="portfolio-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Resumen
          </button>
          <button 
            className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            Activos
          </button>
          <button 
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Añadir Activo
          </button>
        </div>
        
        <div className="tab-content">
          <div className={`tab-panel ${activeTab === 'summary' ? 'active' : ''}`}>
            <div className="portfolio-layout">
              <div className="portfolio-main">
                <PortfolioSummary />
              </div>
              <div className="portfolio-sidebar">
                <PortfolioDistribution />
              </div>
            </div>
          </div>
          
          <div className={`tab-panel ${activeTab === 'assets' ? 'active' : ''}`}>
            <AssetList />
          </div>
          
          <div className={`tab-panel ${activeTab === 'add' ? 'active' : ''}`}>
            <AssetForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 