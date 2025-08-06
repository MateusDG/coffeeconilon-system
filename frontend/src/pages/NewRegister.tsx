import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Typography, Link, Alert, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import logo from '../assets/logo.svg';

const NewRegister: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch {
      setError('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#4bae4f', '&:hover': { bgcolor: '#3e8e41' }, borderRadius: '16px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'CRIAR CONTA'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Já possui uma conta?{' '}
                <Link component={RouterLink} to="/login" variant="body2">
                  Entrar
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
  );
};

export default NewRegister;
