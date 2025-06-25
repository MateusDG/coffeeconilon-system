import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import ReportView from '../components/Reports/ReportView';

const ReportsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/reports');
        setData(res.data);
      } catch {
        setError('Erro ao carregar relatórios');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>Relatórios</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <ReportView data={data} />
    </>
  );
};

export default ReportsPage;