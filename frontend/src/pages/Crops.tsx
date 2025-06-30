import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import CropsTable, { Crop } from '../components/Crops/CropsTable';
import CropDialog, { CropForm } from '../components/Crops/CropDialog';
import type { Lot } from '../components/Lots/LotsTable';

const CropsPage: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lotsOptions, setLotsOptions] = useState<Lot[]>([]);
  const [form, setForm] = useState<CropForm>({ lot_id: '', planted_date: '', harvested_date: '', yield_bags: '' });

  const loadData = async () => {
    try {
      const res = await api.get<Crop[]>('/crops');
      setCrops(res.data);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const loadLots = async () => {
    try {
      const res = await api.get<Lot[]>('/lots');
      setLotsOptions(res.data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadData();
    loadLots();
  }, []);

  const handleSave = async (data: CropForm) => {
    const payload = {
      lot_id: Number(data.lot_id),
      planted_date: data.planted_date,
      harvested_date: data.harvested_date || null,
      yield_bags: data.yield_bags ? Number(data.yield_bags) : null,
    };
    try {
      if (editing) {
        await api.put(`/crops/${editing.id}`, payload);
      } else {
        await api.post('/crops', payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ lot_id: '', planted_date: '', harvested_date: '', yield_bags: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/crops/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleEdit = (c: Crop) => {
    setEditing(c);
    setForm({
      lot_id: String(c.lot_id),
      planted_date: c.planted_date,
      harvested_date: c.harvested_date || '',
      yield_bags: c.yield_bags?.toString() || '',
    });
    setOpen(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ lot_id: '', planted_date: '', harvested_date: '', yield_bags: '' });
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
      <Typography variant="h4" gutterBottom>Safras</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Nova safra</Button>
      <CropsTable crops={crops} onEdit={handleEdit} onDelete={handleDelete} />
      <CropDialog
        open={open}
        editing={!!editing}
        initialForm={form}
        lots={lotsOptions}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CropsPage;