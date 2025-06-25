import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import FinancialTable, { FinancialRecord } from '../components/Financial/FinancialTable';

const FinancialPage: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<FinancialRecord[]>('/financial');
        setRecords(res.data);
      } catch {
        setError('Erro ao carregar dados');
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
      <Typography variant="h4" gutterBottom>Financeiro</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <FinancialTable records={records} />
    </>
  );
};

export default FinancialPage;