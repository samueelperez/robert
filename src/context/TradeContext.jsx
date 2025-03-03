import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Crear el contexto
export const TradeContext = createContext();

// Proveedor del contexto
export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar trades desde localStorage al iniciar
  useEffect(() => {
    const loadTrades = () => {
      try {
        const savedTrades = localStorage.getItem('trades');
        if (savedTrades) {
          setTrades(JSON.parse(savedTrades));
        } else {
          // Si no hay trades guardados, inicializar con un array vacío
          setTrades([]);
        }
      } catch (error) {
        console.error('Error loading trades from localStorage:', error);
        setTrades([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrades();
  }, []);

  // Guardar trades en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('trades', JSON.stringify(trades));
    }
  }, [trades, isLoading]);

  // Añadir un nuevo trade
  const addTrade = (newTrade) => {
    // Generar un ID único para el nuevo trade
    const id = `trade-${Date.now()}`;
    const tradeWithId = { ...newTrade, id };
    setTrades([...trades, tradeWithId]);
    return tradeWithId;
  };

  // Actualizar un trade existente
  const updateTrade = (updatedTrade) => {
    setTrades(trades.map(trade => 
      trade.id === updatedTrade.id ? updatedTrade : trade
    ));
  };

  // Eliminar un trade
  const deleteTrade = (tradeId) => {
    setTrades(trades.filter(trade => trade.id !== tradeId));
  };

  // Obtener un trade por su ID
  const getTradeById = (tradeId) => {
    return trades.find(trade => trade.id === tradeId);
  };

  // Valor del contexto que se proporcionará
  const contextValue = {
    trades,
    isLoading,
    addTrade,
    updateTrade,
    deleteTrade,
    getTradeById
  };

  return (
    <TradeContext.Provider value={contextValue}>
      {children}
    </TradeContext.Provider>
  );
};

export default TradeProvider; 