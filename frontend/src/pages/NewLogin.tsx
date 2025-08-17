import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, Button, Typography, Link, Alert, CircularProgress, Snackbar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import logo from '../assets/logo.svg';

const NewLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    const expired = localStorage.getItem('sessionExpired');
    if (expired) {
      setNotice('Sua sessão expirou. Faça login novamente.');
      setSnackOpen(true);
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left side with form */}
      <Grid item xs={12} sm={8} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '250px', height: '250px' }} />
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '80%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          />
          {notice && <Alert severity="info" sx={{ mb: 1 }}>{notice}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link component={RouterLink} to="#" variant="body2">
              Esqueceu a senha?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#4bae4f', '&:hover': { bgcolor: '#3e8e41' }, borderRadius: '16px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'ENTRAR'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Não possui conta?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Criar conta
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Right side with image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-12/84SZHvCAAT.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Box sx={{ p: 4, borderRadius: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography variant="h5">
            Bem vindo ao SystemConilon, gestão eficiente de café para pequenos e médios produtores.
          </Typography>
        </Box>
      </Grid>
    </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        message={notice}
      />
  </>
  );
};

export default NewLogin;
