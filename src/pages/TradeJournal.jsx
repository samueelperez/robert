import React, { useState } from 'react';
import TradeForm from '../components/trades/TradeForm';
import TradeList from '../components/trades/TradeList';
import TradeFilters from '../components/trades/TradeFilters';

const TradeJournal = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    instrument: 'all',
    result: 'all'
  });
  
  return (
    <div className="trade-journal-container">
      <h1>Diario de Operaciones</h1>
      
      <TradeForm />
      
      <TradeFilters filters={filters} setFilters={setFilters} />
      
      <TradeList filters={filters} />
    </div>
  );
};

export default TradeJournal; 