import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const PortfolioSummary = () => {
  const { 
    assets, 
    calculateTotalValue, 
    calculateTotalProfitLoss,
    calculateTotalProfitLossPercentage
  } = usePortfolio();

  const totalValue = calculateTotalValue();
  const totalProfitLoss = calculateTotalProfitLoss();
  const profitLossPercentage = calculateTotalProfitLossPercentage();
  
  // Formatear números para mostrar
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(value);
  };
  
  const formatPercentage = (value) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'percent', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(value / 100);
  };

  return (
    <div className="portfolio-summary">
      <h3>Resumen del Portfolio</h3>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-title">Valor Total</div>
          <div className="summary-value">{formatCurrency(totalValue)}</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-title">Ganancia/Pérdida</div>
          <div className={`summary-value ${totalProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(totalProfitLoss)}
          </div>
          <div className={`summary-percentage ${totalProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(profitLossPercentage)}
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-title">Número de Activos</div>
          <div className="summary-value">{assets.length}</div>
        </div>
      </div>
      
      <div className="recent-performance">
        <h4>Rendimiento Reciente</h4>
        <p>Próximamente: Gráfico de rendimiento del portfolio en el tiempo</p>
      </div>
    </div>
  );
};

export default PortfolioSummary; 