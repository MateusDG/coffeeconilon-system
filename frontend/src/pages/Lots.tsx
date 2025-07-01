import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';

import LotsTable, { Lot } from '../components/Lots/LotsTable';
import LotDialog, { LotForm } from '../components/Lots/LotDialog';
import MapView from '../components/Lots/MapView';
import type { Farm } from '../components/Farm/FarmsTable';

const LotsPage: React.FC = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [farms, setFarms] = useState<Farm[]>([]);
  const [form, setForm] = useState<LotForm>({ name: '', area_ha: '', farm_id: '', crop_year: '' });

  const loadData = async () => {
    try {
      const res = await api.get<Lot[]>('/lots');
      setLots(res.data);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const loadFarms = async () => {
    try {
      const res = await api.get<Farm[]>('/farms');
      setFarms(res.data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadData();
    loadFarms();
  }, []);

  const handleSave = async (data: LotForm) => {
    const payload = {
      name: data.name,
      area_ha: Number(data.area_ha),
      farm_id: Number(data.farm_id),
      crop_year: data.crop_year ? Number(data.crop_year) : undefined,
    };
    try {
      if (editing) {
        await api.put(`/lots/${editing.id}`, payload);
      } else {
        await api.post('/lots', payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: '', area_ha: '', farm_id: '', crop_year: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleEdit = (l: Lot) => {
    setEditing(l);
    setForm({
      name: l.name,
      area_ha: String(l.area_ha),
      farm_id: String(l.farm_id),
      crop_year: l.crop_year ? String(l.crop_year) : '',
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/lots/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ name: '', area_ha: '', farm_id: '', crop_year: '' });
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
      <Typography variant="h4" gutterBottom>Lotes</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Novo lote</Button>
      <LotsTable lots={lots} onEdit={handleEdit} onDelete={handleDelete} />
      <MapView lots={lots} />
      <LotDialog
        open={open}
        editing={!!editing}
        initialForm={form}
        farms={farms}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default LotsPage;