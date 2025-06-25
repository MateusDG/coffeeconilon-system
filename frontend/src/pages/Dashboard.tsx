import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, CircularProgress, Box, Card, CardContent } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import api from '../services/api';

interface Summary {
  financial: number;
  stocks: number;
  users: number;
}

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<Summary>({ financial: 0, stocks: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fin, stocks, users] = await Promise.all([
          api.get('/financial'),
          api.get('/stocks'),
          api.get('/users'),
        ]);
        setSummary({
          financial: fin.data.length,
          stocks: stocks.data.length,
          users: users.data.length,
        });
      } catch {
        // ignore errors in demo
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <AttachMoneyIcon color="primary" />
              <Typography variant="h6">Lançamentos</Typography>
            </Box>
            <Typography variant="h4">{summary.financial}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <InventoryIcon color="primary" />
              <Typography variant="h6">Movimentos</Typography>
            </Box>
            <Typography variant="h4">{summary.stocks}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleIcon color="primary" />
              <Typography variant="h6">Produtores</Typography>
            </Box>
            <Typography variant="h4">{summary.users}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;