import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h3" gutterBottom>
      Bem-vindo ao Coffee Conilon
    </Typography>
    <Typography variant="subtitle1" sx={{ mb: 4 }}>
      Gerencie propriedades, lotes, safras e finanças de forma integrada.
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button variant="contained" component={RouterLink} to="/setup">
        Assistente Inicial
      </Button>
      <Button variant="outlined" component={RouterLink} to="/dashboard">
        Dashboard
      </Button>
    </Stack>
  </Box>
);

export default HomePage;