import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import api from '../services/api';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/ping').then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography>Exemplo de resposta do backend:</Typography>
          <pre>{JSON.stringify(stats, null, 2)}</pre>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;