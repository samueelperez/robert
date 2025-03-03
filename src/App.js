import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TradeJournal from './pages/TradeJournal';
import Performance from './pages/Performance';
import LearningJournal from './pages/LearningJournal';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<TradeJournal />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/learning" element={<LearningJournal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
