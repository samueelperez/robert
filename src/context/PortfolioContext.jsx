import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  // Estado para los activos del portfolio
  const [assets, setAssets] = useState(() => {
    const savedAssets = localStorage.getItem('portfolioAssets');
    return savedAssets ? JSON.parse(savedAssets) : [];
  });

  // Guardar activos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
  }, [assets]);

  // Añadir un nuevo activo
  const addAsset = (asset) => {
    const newAsset = {
      ...asset,
      id: uuidv4(),
      dateAdded: new Date().toISOString(),
    };
    setAssets([...assets, newAsset]);
  };

  // Actualizar un activo existente
  const updateAsset = (id, updatedAsset) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, ...updatedAsset } : asset
    ));
  };

  // Eliminar un activo
  const deleteAsset = (id) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  // Calcular el valor total del portfolio
  const calculateTotalValue = () => {
    return assets.reduce((total, asset) => {
      return total + (asset.quantity * asset.currentPrice);
    }, 0);
  };

  // Calcular la ganancia/pérdida total
  const calculateTotalProfitLoss = () => {
    return assets.reduce((total, asset) => {
      const investedAmount = asset.quantity * asset.purchasePrice;
      const currentAmount = asset.quantity * asset.currentPrice;
      return total + (currentAmount - investedAmount);
    }, 0);
  };

  // Calcular el porcentaje de ganancia/pérdida
  const calculateTotalProfitLossPercentage = () => {
    const totalInvested = assets.reduce((total, asset) => {
      return total + (asset.quantity * asset.purchasePrice);
    }, 0);
    
    const totalCurrent = calculateTotalValue();
    
    if (totalInvested === 0) return 0;
    
    return ((totalCurrent - totalInvested) / totalInvested) * 100;
  };

  // Obtener la distribución del portfolio por tipo de activo
  const getAssetDistribution = () => {
    const distribution = {};
    const totalValue = calculateTotalValue();
    
    assets.forEach(asset => {
      const assetValue = asset.quantity * asset.currentPrice;
      if (distribution[asset.type]) {
        distribution[asset.type] += assetValue;
      } else {
        distribution[asset.type] = assetValue;
      }
    });
    
    // Convertir a porcentajes
    Object.keys(distribution).forEach(key => {
      distribution[key] = (distribution[key] / totalValue) * 100;
    });
    
    return distribution;
  };

  return (
    <PortfolioContext.Provider value={{
      assets,
      addAsset,
      updateAsset,
      deleteAsset,
      calculateTotalValue,
      calculateTotalProfitLoss,
      calculateTotalProfitLossPercentage,
      getAssetDistribution
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}; 