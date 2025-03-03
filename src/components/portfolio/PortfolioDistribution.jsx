import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { usePortfolio } from '../../context/PortfolioContext';

const PortfolioDistribution = () => {
  const { getAssetDistribution } = usePortfolio();
  
  const distribution = getAssetDistribution();
  
  // Convertir el objeto de distribución a un array para el gráfico
  const data = Object.keys(distribution).map(key => ({
    name: key === 'stock' ? 'Acciones' :
          key === 'crypto' ? 'Criptomonedas' :
          key === 'etf' ? 'ETF' :
          key === 'bond' ? 'Bonos' :
          key === 'commodity' ? 'Materias Primas' :
          'Otros',
    value: distribution[key]
  }));
  
  // Colores para el gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  // Formatear porcentaje para el tooltip
  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };
  
  // Renderizar etiqueta personalizada
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  if (data.length === 0) {
    return (
      <div className="portfolio-distribution">
        <h3>Distribución del Portfolio</h3>
        <p>Añade activos para ver la distribución de tu portfolio.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-distribution">
      <h3>Distribución del Portfolio</h3>
      
      <div className="distribution-chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatPercentage} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="distribution-list">
        {data.map((item, index) => (
          <div key={index} className="distribution-item">
            <div className="distribution-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <div className="distribution-name">{item.name}</div>
            <div className="distribution-value">{formatPercentage(item.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDistribution; 