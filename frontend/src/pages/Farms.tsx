import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import FarmsTable, { Farm } from '../components/Farms/FarmsTable';
import FarmDialog, { FarmForm } from '../components/Farms/FarmDialog';

const FarmsPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FarmForm>({ name: '', location: '', owner_id: '' });

  const loadData = async () => {
    try {
      const res = await api.get<Farm[]>('/farms');
      setFarms(res.data);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: FarmForm) => {
    const payload = { name: data.name, location: data.location, owner_id: Number(data.owner_id) };
    try {
      if (editing) {
        await api.put(`/farms/${editing.id}`, payload);
      } else {
        await api.post('/farms', payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: '', location: '', owner_id: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/farms/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleEdit = (f: Farm) => {
    setEditing(f);
    setForm({ name: f.name, location: f.location || '', owner_id: String(f.owner_id) });
    setOpen(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: '', location: '', owner_id: '' });
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
      <Typography variant="h4" gutterBottom>Fazendas</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Nova fazenda</Button>
      <FarmsTable farms={farms} onEdit={handleEdit} onDelete={handleDelete} />
      <FarmDialog open={open} editing={!!editing} initialForm={form} onClose={() => setOpen(false)} onSave={handleSave} />
    </>
  );
};

export default FarmsPage;