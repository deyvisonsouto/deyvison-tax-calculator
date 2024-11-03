import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaxCalculatorPage from './pages/TaxCalculatorPage';
import NotFoundPage from './pages/NotFoundPage';
import './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';
const App: React.FC = () => {
  return (
    <div className="app-container">
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<TaxCalculatorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
