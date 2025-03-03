import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <title>Trading Journal | Tu Diario de Operaciones</title>
          <meta name="description" content="Registra y analiza tus operaciones de trading para mejorar tus resultados" />
        </Helmet>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
              <>
                <Helmet>
                  <title>Dashboard | Trading Journal</title>
                </Helmet>
                <Dashboard />
              </>
            } />
            <Route path="/trades" element={
              <>
                <Helmet>
                  <title>Operaciones | Trading Journal</title>
                </Helmet>
                <TradeJournal />
              </>
            } />
            <Route path="/learning" element={
              <>
                <Helmet>
                  <title>Aprendizaje | Trading Journal</title>
                </Helmet>
                <LearningJournal />
              </>
            } />
            <Route path="/settings" element={
              <>
                <Helmet>
                  <title>Configuración | Trading Journal</title>
                </Helmet>
                <Settings />
              </>
            } />
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
