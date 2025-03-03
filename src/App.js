import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TradeJournal from './pages/TradeJournal';
import LearningJournal from './pages/LearningJournal';
import Settings from './pages/Settings';
// import Portfolio from './pages/Portfolio'; // Comentamos hasta que esté listo

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trades" element={<TradeJournal />} />
            <Route path="/learning" element={<LearningJournal />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
