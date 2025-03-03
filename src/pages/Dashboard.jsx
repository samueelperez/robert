import React from 'react';
import ProfitChart from '../components/charts/ProfitChart';
import TradeStats from '../components/dashboard/TradeStats';
import RecentTrades from '../components/dashboard/RecentTrades';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard de Trading</h1>
      
      <div className="stats-overview">
        <TradeStats />
      </div>
      
      <div className="charts-container">
        <ProfitChart />
      </div>
      
      <div className="recent-activity">
        <RecentTrades />
      </div>
      
      <div className="performance-metrics">
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default Dashboard; 