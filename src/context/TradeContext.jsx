import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TradeContext = createContext();

const initialState = {
  trades: [],
  loading: false,
  error: null
};

function tradeReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TRADES_SUCCESS':
      return { ...state, trades: action.payload, loading: false };
    case 'ADD_TRADE':
      return { ...state, trades: [...state.trades, action.payload] };
    case 'UPDATE_TRADE':
      return {
        ...state,
        trades: state.trades.map(trade => 
          trade.id === action.payload.id ? action.payload : trade
        )
      };
    case 'DELETE_TRADE':
      return {
        ...state,
        trades: state.trades.filter(trade => trade.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function TradeProvider({ children }) {
  const [state, dispatch] = useReducer(tradeReducer, initialState);
  
  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const loadTrades = () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const savedTrades = localStorage.getItem('trades');
        if (savedTrades) {
          dispatch({ 
            type: 'FETCH_TRADES_SUCCESS', 
            payload: JSON.parse(savedTrades) 
          });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };
    
    loadTrades();
  }, []);
  
  // Guardar en localStorage cuando cambian los trades
  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(state.trades));
  }, [state.trades]);
  
  // Acciones
  const addTrade = (trade) => {
    const newTrade = {
      ...trade,
      id: uuidv4(),
      date: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TRADE', payload: newTrade });
  };
  
  const updateTrade = (trade) => {
    dispatch({ type: 'UPDATE_TRADE', payload: trade });
  };
  
  const deleteTrade = (id) => {
    dispatch({ type: 'DELETE_TRADE', payload: id });
  };
  
  return (
    <TradeContext.Provider value={{ 
      ...state, 
      addTrade, 
      updateTrade, 
      deleteTrade 
    }}>
      {children}
    </TradeContext.Provider>
  );
}

export const useTrades = () => useContext(TradeContext); 