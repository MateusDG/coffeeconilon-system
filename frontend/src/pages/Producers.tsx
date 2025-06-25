import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';

import ProducersTable, { Producer } from '../components/Producers/ProducersTable';
import ProducerDialog, { ProducerForm } from '../components/Producers/ProducerDialog';

const ProducersPage: React.FC = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Producer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<ProducerForm>({ name: '', email: '', password: '' });

  const loadData = async () => {
    try {
      const res = await api.get<Producer[]>('/users');
      setProducers(res.data);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: ProducerForm) => {
    try {
      if (editing) {
        await api.put(`/users/${editing.id}`, { name: data.name, email: data.email });
      } else {
        await api.post('/users', data);
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: '', email: '', password: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleEdit = (p: Producer) => {
    setEditing(p);
    setForm({ name: p.name, email: p.email, password: '' });
    setOpen(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: '', email: '', password: '' });
    setOpen(true);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>Produtores</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Novo produtor</Button>
      <ProducersTable producers={producers} onEdit={handleEdit} onDelete={handleDelete} />
      <ProducerDialog open={open} editing={!!editing} initialForm={form} onClose={() => setOpen(false)} onSave={handleSave} />
    </>
  );
};

export default ProducersPage;