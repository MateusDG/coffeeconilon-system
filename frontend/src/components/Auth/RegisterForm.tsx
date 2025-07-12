import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
    } catch {
      setError('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={8}>
      <Typography variant="h5" gutterBottom>Criar Conta</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nome" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <TextField label="Confirmar Senha" type="password" fullWidth margin="normal" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Registrar'}
          </Button>
          <Button component={RouterLink} to="/login" variant="outlined" fullWidth>Voltar ao login</Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;