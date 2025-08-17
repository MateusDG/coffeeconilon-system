import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewLogin from './pages/NewLogin';
import NewRegister from './pages/NewRegister';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import ProducersPage from './pages/Producers';
import LotsPage from './pages/Lots';
import FarmsPage from './pages/Farms';
import CropsPage from './pages/Crops';
import ReportsPage from './pages/Reports';
import FinancialPage from './pages/Financial';
import InventoryPage from './pages/Inventory';
import SetupWizard from './pages/SetupWizard';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContexts';
import { Box, CircularProgress } from '@mui/material';

const App: React.FC = () => {
  const { token, ready } = useAuth();

  if (!ready) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<NewLogin />} />
        <Route path="/register" element={<NewRegister />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/farms" element={<FarmsPage />} />
        <Route path="/lots" element={<LotsPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/setup" element={<SetupWizard />} />
        <Route path="/financial" element={<FinancialPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
