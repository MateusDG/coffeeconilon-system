import React from 'react';
import { Box, Typography, Button, Stack, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => (
  <Box sx={{ m: -2 }}>
    {/* Hero */}
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '75vh', md: '82vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
        // Try public root first (/cafe.jpg). Fallback to repository /image/cafe.jpg if served.
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.35) 100%), url('/caf%C3%A9.jpg'), url('/café.jpg'), url('/cafe.jpg'), url('/image/cafe.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box sx={{ px: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: 0.5 }} gutterBottom>
          Coffee Conilon
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.92, maxWidth: 760, mx: 'auto', mb: 3 }}>
          Gestão moderna de fazendas, lotes, safras, estoque e finanças — tudo em um só lugar.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 1 }}>
          <Button size="large" variant="contained" color="primary" component={RouterLink} to="/setup">
            Começar agora
          </Button>
          <Button size="large" variant="outlined" color="inherit" component={RouterLink} to="/dashboard">
            Ver Dashboard
          </Button>
        </Stack>
      </Box>
    </Box>

    {/* Highlights */}
    <Box sx={{ px: { xs: 2, md: 6 }, py: 5, background: (t) => t.palette.background.default }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="h6">Operações Inteligentes</Typography>
            <Typography variant="body2" color="text.secondary">
              Registre entradas e saídas, acompanhe o fluxo financeiro e visualize resultados com clareza.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="text" component={RouterLink} to="/financial">Abrir Financeiro</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="h6">Estoques & Safras</Typography>
            <Typography variant="body2" color="text.secondary">
              Controle produtos, lotes e safras. Monitore níveis e evite rupturas com alertas.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="text" component={RouterLink} to="/inventory">Abrir Estoque</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="h6">Relatórios & Insights</Typography>
            <Typography variant="body2" color="text.secondary">
              Gere relatórios por período, fazenda e lote. Decida com base em dados.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="text" component={RouterLink} to="/reports">Abrir Relatórios</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default HomePage;
