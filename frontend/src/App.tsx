import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import ProducersPage from './pages/Producers';
import LotsPage from './pages/Lots';
import FarmsPage from './pages/Farms';
import CropsPage from './pages/Crops';
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/farms" element={<FarmsPage />} />
        <Route path="/lots" element={<LotsPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/financial" element={<FinancialPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;