import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MainBudget from './pages/MainBudget';
import FinancialDetails from './pages/FinancialDetails';
import KeyFacts from './pages/KeyFacts';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/main-budget" element={<MainBudget />} />
          <Route path="/financial-details" element={<FinancialDetails />} />
          <Route path="/key-facts" element={<KeyFacts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;