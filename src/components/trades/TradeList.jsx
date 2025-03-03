import React from 'react';

const TradeList = ({ filters }) => {
  // Datos de ejemplo
  const trades = [
    {
      id: '1',
      date: '2023-03-01',
      instrument: 'EUR/USD',
      type: 'BUY',
      entryPrice: 1.0850,
      exitPrice: 1.0900,
      size: 1.0,
      profit: 50,
      result: 'WIN'
    },
    {
      id: '2',
      date: '2023-03-02',
      instrument: 'BTC/USD',
      type: 'SELL',
      entryPrice: 28500,
      exitPrice: 28300,
      size: 0.1,
      profit: 20,
      result: 'WIN'
    },
    {
      id: '3',
      date: '2023-03-03',
      instrument: 'EUR/JPY',
      type: 'BUY',
      entryPrice: 158.50,
      exitPrice: 158.20,
      size: 1.0,
      profit: -30,
      result: 'LOSS'
    }
  ];

  // Aplicar filtros (simplificado)
  const filteredTrades = trades.filter(trade => {
    if (filters.instrument !== 'all' && trade.instrument !== filters.instrument) return false;
    if (filters.result !== 'all' && trade.result !== filters.result) return false;
    return true;
  });

  return (
    <div className="trade-list">
      <h3>Operaciones Registradas</h3>
      
      {filteredTrades.length === 0 ? (
        <p>No hay operaciones que coincidan con los filtros seleccionados.</p>
      ) : (
        <div className="trades-table">
          <div className="table-header">
            <div className="header-cell">Fecha</div>
            <div className="header-cell">Instrumento</div>
            <div className="header-cell">Tipo</div>
            <div className="header-cell">Entrada</div>
            <div className="header-cell">Salida</div>
            <div className="header-cell">Tamaño</div>
            <div className="header-cell">Beneficio</div>
            <div className="header-cell">Resultado</div>
            <div className="header-cell">Acciones</div>
          </div>
          
          {filteredTrades.map(trade => (
            <div key={trade.id} className="table-row">
              <div className="cell">{trade.date}</div>
              <div className="cell">{trade.instrument}</div>
              <div className="cell">{trade.type}</div>
              <div className="cell">{trade.entryPrice}</div>
              <div className="cell">{trade.exitPrice}</div>
              <div className="cell">{trade.size}</div>
              <div className={`cell ${trade.profit >= 0 ? 'positive' : 'negative'}`}>
                {trade.profit > 0 ? '+' : ''}{trade.profit}€
              </div>
              <div className={`cell result ${trade.result.toLowerCase()}`}>{trade.result}</div>
              <div className="cell actions">
                <button className="btn-edit">Editar</button>
                <button className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TradeList; 