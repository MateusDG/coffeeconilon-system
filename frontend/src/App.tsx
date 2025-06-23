import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ProducersPage from './pages/Producers';
import LotsPage from './pages/Lots';
import ReportsPage from './pages/Reports';
import FinancialPage from './pages/Financial';
import InventoryPage from './pages/Inventory';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContexts';

const App: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/lots" element={<LotsPage />} />
        <Route path="/financial" element={<FinancialPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;