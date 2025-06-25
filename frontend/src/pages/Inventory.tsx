import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';

import InventoryTable, { StockRecord } from '../components/Inventory/InventoryTable';

const InventoryPage: React.FC = () => {
  const [records, setRecords] = useState<StockRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<StockRecord[]>('/stocks');
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
      <Typography variant="h4" gutterBottom>Estoque</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <InventoryTable records={records} />
    </>
  );
};

export default InventoryPage;