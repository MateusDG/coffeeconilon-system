import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContexts';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <Box mt={8}>
      <Typography variant="h5" gutterBottom>Entrar</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Typography align="center" variant="body2" sx={{ mt: 1 }}>
          Não tem conta?{' '}
          <Link component={RouterLink} to="/register">Cadastre-se</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;