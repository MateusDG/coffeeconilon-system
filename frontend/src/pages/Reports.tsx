import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';

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
      <Paper sx={{ p: 2 }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Paper>
    </>
  );
};

export default ReportsPage;