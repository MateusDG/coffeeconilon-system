import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch {
      alert('Credenciais inválidas');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>Entrar</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            Criar conta
          </Button>
          <Typography align="center" variant="body2" sx={{ mt: 1 }}>
            Não tem conta?{' '}
            <Link component={RouterLink} to="/register">
              Cadastre-se
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;