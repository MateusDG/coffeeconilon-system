import React from 'react';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  onDismiss: () => void;
  show: boolean;
}

const WelcomeBanner: React.FC<Props> = ({ onDismiss, show }) => {
  if (!show) return null;
  return (
    <Alert
      icon={<CelebrationIcon />}
      severity="info"
      sx={{ borderRadius: 2, alignItems: 'center' }}
      action={<Button color="inherit" onClick={onDismiss}>Ocultar</Button>}
    >
      <AlertTitle>Bem-vindo ao Coffee Conilon</AlertTitle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="body2">
          Configure rapidamente sua operação: cadastre fazendas, lotes e o primeiro lançamento.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/setup" size="small">
          Abrir Assistente Inicial
        </Button>
      </Stack>
    </Alert>
  );
};

export default WelcomeBanner;

