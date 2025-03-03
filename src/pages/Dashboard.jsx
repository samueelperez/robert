import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, FaCalendarAlt, FaExchangeAlt, FaChartPie, 
  FaArrowUp, FaArrowDown, FaEllipsisH, FaPlus, FaFilter,
  FaRegClock, FaRegLightbulb, FaRegChartBar
} from 'react-icons/fa';
import { TradeContext } from '../context/TradeContext';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { trades } = useContext(TradeContext);
  const [timeframe, setTimeframe] = useState('month');
  const [performanceData, setPerformanceData] = useState([]);
  const [tradesByAsset, setTradesByAsset] = useState([]);
  const [tradesByStrategy, setTradesByStrategy] = useState([]);
  const [profitLossRatio, setProfitLossRatio] = useState({ wins: 0, losses: 0 });
  const [recentTrades, setRecentTrades] = useState([]);
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    avgProfit: 0,
    totalProfit: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Colores para gráficos
  const COLORS = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
  const PROFIT_COLOR = '#10b981';
  const LOSS_COLOR = '#ef4444';

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      if (trades && trades.length > 0) {
        processTradeData(trades);
      } else {
        // Datos de ejemplo si no hay trades reales
        generateDummyData();
      }
      setIsLoading(false);
    }, 1000);
  }, [trades, timeframe]);

  const processTradeData = (tradeData) => {
    // Procesar datos para gráficos de rendimiento
    const performanceByDate = {};
    const assetMap = {};
    const strategyMap = {};
    let wins = 0;
    let losses = 0;
    let totalProfit = 0;
    
    // Ordenar trades por fecha (más recientes primero)
    const sortedTrades = [...tradeData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Tomar los 5 trades más recientes
    const recent = sortedTrades.slice(0, 5);
    
    tradeData.forEach(trade => {
      // Datos para gráfico de rendimiento
      const date = new Date(trade.date);
      const dateKey = formatDate(date, timeframe);
      
      if (!performanceByDate[dateKey]) {
        performanceByDate[dateKey] = { date: dateKey, profit: 0, trades: 0 };
      }
      
      performanceByDate[dateKey].profit += trade.profitLoss;
      performanceByDate[dateKey].trades += 1;
      
      // Datos para gráfico de activos
      if (!assetMap[trade.asset]) {
        assetMap[trade.asset] = { name: trade.asset, value: 0, trades: 0 };
      }
      assetMap[trade.asset].value += trade.profitLoss;
      assetMap[trade.asset].trades += 1;
      
      // Datos para gráfico de estrategias
      if (!strategyMap[trade.strategy]) {
        strategyMap[trade.strategy] = { name: trade.strategy, value: 0, trades: 0 };
      }
      strategyMap[trade.strategy].value += trade.profitLoss;
      strategyMap[trade.strategy].trades += 1;
      
      // Conteo de trades ganadores/perdedores
      if (trade.profitLoss > 0) wins++;
      else if (trade.profitLoss < 0) losses++;
      
      totalProfit += trade.profitLoss;
    });
    
    // Convertir objetos a arrays para los gráficos
    const performanceArray = Object.values(performanceByDate).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    
    const assetArray = Object.values(assetMap).sort((a, b) => b.value - a.value);
    const strategyArray = Object.values(strategyMap).sort((a, b) => b.value - a.value);
    
    // Calcular estadísticas
    const totalTrades = tradeData.length;
    const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
    const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;
    
    setPerformanceData(performanceArray);
    setTradesByAsset(assetArray);
    setTradesByStrategy(strategyArray);
    setProfitLossRatio({ wins, losses });
    setRecentTrades(recent);
    setStats({
      totalTrades,
      winRate,
      avgProfit,
      totalProfit
    });
  };

  const generateDummyData = () => {
    // Datos de ejemplo para demostración
    const dummyPerformance = [
      { date: '2023-01', profit: 1200, trades: 15 },
      { date: '2023-02', profit: 800, trades: 12 },
      { date: '2023-03', profit: -500, trades: 10 },
      { date: '2023-04', profit: 1500, trades: 18 },
      { date: '2023-05', profit: 2200, trades: 22 },
      { date: '2023-06', profit: 1800, trades: 20 },
    ];
    
    const dummyAssets = [
      { name: 'EUR/USD', value: 2500, trades: 25 },
      { name: 'BTC/USD', value: 1800, trades: 15 },
      { name: 'AAPL', value: 1200, trades: 12 },
      { name: 'TSLA', value: -500, trades: 8 },
      { name: 'AMZN', value: 900, trades: 10 },
    ];
    
    const dummyStrategies = [
      { name: 'Trend Following', value: 3200, trades: 30 },
      { name: 'Breakout', value: 1500, trades: 18 },
      { name: 'Scalping', value: 800, trades: 25 },
      { name: 'Swing', value: 1200, trades: 12 },
    ];
    
    const dummyRecentTrades = [
      { id: 1, date: '2023-06-15', asset: 'EUR/USD', type: 'Buy', profitLoss: 250, strategy: 'Trend Following' },
      { id: 2, date: '2023-06-12', asset: 'BTC/USD', type: 'Sell', profitLoss: -120, strategy: 'Breakout' },
      { id: 3, date: '2023-06-10', asset: 'AAPL', type: 'Buy', profitLoss: 180, strategy: 'Swing' },
      { id: 4, date: '2023-06-08', asset: 'TSLA', type: 'Sell', profitLoss: 320, strategy: 'Scalping' },
      { id: 5, date: '2023-06-05', asset: 'AMZN', type: 'Buy', profitLoss: -90, strategy: 'Trend Following' },
    ];
    
    setPerformanceData(dummyPerformance);
    setTradesByAsset(dummyAssets);
    setTradesByStrategy(dummyStrategies);
    setProfitLossRatio({ wins: 35, losses: 15 });
    setRecentTrades(dummyRecentTrades);
    setStats({
      totalTrades: 50,
      winRate: 70,
      avgProfit: 120,
      totalProfit: 6000
    });
  };

  const formatDate = (date, timeframe) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (timeframe) {
      case 'week':
        // Obtener el primer día de la semana
        const firstDay = new Date(date);
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        firstDay.setDate(diff);
        return `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-${String(firstDay.getDate()).padStart(2, '0')}`;
      case 'month':
        return `${year}-${month}`;
      case 'year':
        return `${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          <p className="tooltip-profit" style={{ color: payload[0].value >= 0 ? PROFIT_COLOR : LOSS_COLOR }}>
            {`Beneficio: ${formatCurrency(payload[0].value)}`}
          </p>
          {payload[1] && <p className="tooltip-trades">{`Operaciones: ${payload[1].value}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Resumen de tu actividad de trading</p>
        </div>
        <div className="dashboard-actions">
          <div className="timeframe-selector">
            <button 
              className={timeframe === 'week' ? 'active' : ''} 
              onClick={() => setTimeframe('week')}
            >
              Semana
            </button>
            <button 
              className={timeframe === 'month' ? 'active' : ''} 
              onClick={() => setTimeframe('month')}
            >
              Mes
            </button>
            <button 
              className={timeframe === 'year' ? 'active' : ''} 
              onClick={() => setTimeframe('year')}
            >
              Año
            </button>
          </div>
          <Link to="/journal/new" className="add-trade-button">
            <FaPlus /> Nueva Operación
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon profit">
                <FaChartLine />
              </div>
              <div className="stat-content">
                <h3>Beneficio Total</h3>
                <p className={stats.totalProfit >= 0 ? 'profit-value' : 'loss-value'}>
                  {formatCurrency(stats.totalProfit)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon trades">
                <FaExchangeAlt />
              </div>
              <div className="stat-content">
                <h3>Operaciones</h3>
                <p>{stats.totalTrades}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon win-rate">
                <FaChartPie />
              </div>
              <div className="stat-content">
                <h3>Ratio de Éxito</h3>
                <p>{formatPercentage(stats.winRate)}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon avg-profit">
                <FaRegChartBar />
              </div>
              <div className="stat-content">
                <h3>Beneficio Medio</h3>
                <p className={stats.avgProfit >= 0 ? 'profit-value' : 'loss-value'}>
                  {formatCurrency(stats.avgProfit)}
                </p>
              </div>
            </div>
          </div>

          {/* Gráficos principales */}
          <div className="dashboard-main-charts">
            <div className="chart-card performance-chart">
              <div className="chart-header">
                <h2>Rendimiento</h2>
                <div className="chart-actions">
                  <button className="chart-action-button">
                    <FaFilter />
                  </button>
                  <button className="chart-action-button">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PROFIT_COLOR} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={PROFIT_COLOR} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke={PROFIT_COLOR} 
                      fillOpacity={1} 
                      fill="url(#colorProfit)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="trades" 
                      stroke="#8884d8" 
                      strokeDasharray="5 5" 
                      dot={{ r: 4 }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Gráficos secundarios */}
          <div className="dashboard-secondary-charts">
            <div className="chart-card">
              <div className="chart-header">
                <h2>Operaciones por Activo</h2>
                <div className="chart-actions">
                  <button className="chart-action-button">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={tradesByAsset}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {tradesByAsset.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Operaciones por Estrategia</h2>
                <div className="chart-actions">
                  <button className="chart-action-button">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={tradesByStrategy}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="value">
                      {tradesByStrategy.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.value >= 0 ? PROFIT_COLOR : LOSS_COLOR} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Ratio Ganancia/Pérdida</h2>
                <div className="chart-actions">
                  <button className="chart-action-button">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
              <div className="chart-content win-loss-chart">
                <div className="win-loss-container">
                  <div className="win-loss-bar">
                    <div 
                      className="win-bar" 
                      style={{ 
                        width: `${profitLossRatio.wins + profitLossRatio.losses > 0 
                          ? (profitLossRatio.wins / (profitLossRatio.wins + profitLossRatio.losses)) * 100 
                          : 0}%` 
                      }}
                    >
                      <span className="win-loss-label">
                        {profitLossRatio.wins} Ganancias
                      </span>
                    </div>
                    <div 
                      className="loss-bar" 
                      style={{ 
                        width: `${profitLossRatio.wins + profitLossRatio.losses > 0 
                          ? (profitLossRatio.losses / (profitLossRatio.wins + profitLossRatio.losses)) * 100 
                          : 0}%` 
                      }}
                    >
                      <span className="win-loss-label">
                        {profitLossRatio.losses} Pérdidas
                      </span>
                    </div>
                  </div>
                  <div className="win-loss-stats">
                    <div className="win-stat">
                      <FaArrowUp /> {formatPercentage((profitLossRatio.wins / (profitLossRatio.wins + profitLossRatio.losses || 1)) * 100)}
                    </div>
                    <div className="loss-stat">
                      <FaArrowDown /> {formatPercentage((profitLossRatio.losses / (profitLossRatio.wins + profitLossRatio.losses || 1)) * 100)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operaciones recientes */}
          <div className="recent-trades-section">
            <div className="section-header">
              <h2>Operaciones Recientes</h2>
              <Link to="/journal" className="view-all-link">Ver todas</Link>
            </div>
            <div className="recent-trades-table">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Activo</th>
                    <th>Tipo</th>
                    <th>Estrategia</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map(trade => (
                    <tr key={trade.id}>
                      <td>
                        <div className="trade-date">
                          <FaCalendarAlt className="trade-icon" />
                          <span>{trade.date}</span>
                        </div>
                      </td>
                      <td>{trade.asset}</td>
                      <td>
                        <span className={`trade-type ${trade.type.toLowerCase()}`}>
                          {trade.type}
                        </span>
                      </td>
                      <td>{trade.strategy}</td>
                      <td>
                        <span className={trade.profitLoss >= 0 ? 'profit-value' : 'loss-value'}>
                          {formatCurrency(trade.profitLoss)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sección de consejos */}
          <div className="tips-section">
            <div className="tip-card">
              <div className="tip-icon">
                <FaRegLightbulb />
              </div>
              <div className="tip-content">
                <h3>Consejo del día</h3>
                <p>Mantén un diario detallado de tus operaciones para identificar patrones y mejorar tu estrategia.</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <FaRegClock />
              </div>
              <div className="tip-content">
                <h3>Recordatorio</h3>
                <p>Revisa tus operaciones semanalmente para ajustar tu estrategia y mejorar tus resultados.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 