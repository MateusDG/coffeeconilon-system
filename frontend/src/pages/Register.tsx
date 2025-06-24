import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch {
      alert('Erro ao criar conta');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>Criar Conta</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nome" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth>Registrar</Button>
            <Button component={RouterLink} to="/login" variant="outlined" fullWidth>Voltar ao login</Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;