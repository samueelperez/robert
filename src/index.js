import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/LandingPage.css';
import './styles/VideoList.css';
import './styles/LearningJournal.css';
import './styles/Portfolio.css';
import './styles/TradeJournal.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TradeProvider } from './context/TradeContext';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TradeProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </TradeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
