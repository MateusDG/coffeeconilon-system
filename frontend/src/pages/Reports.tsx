import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import api from '../services/api';

const ReportsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/reports').then(res => setData(res.data)).catch(() => {});
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Relatórios</Typography>
      <Paper sx={{ p: 2 }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Paper>
    </>
  );
};

export default ReportsPage;