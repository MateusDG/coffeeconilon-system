import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import FinancialTable, { FinancialRecord } from '../components/Financial/FinancialTable';
import FinancialDialog, { FinancialForm } from '../components/Financial/FinancialDialog';
import type { Lot } from '../components/Lots/LotsTable';

const FinancialPage: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FinancialRecord | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [form, setForm] = useState<FinancialForm>({
    type: 'IN',
    category: '',
    description: '',
    value: '',
    date: '',
    lot_id: '',
  });

  const loadData = async () => {
    try {
      const res = await api.get<FinancialRecord[]>('/financial');
      setRecords(res.data);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const loadLots = async () => {
    try {
      const res = await api.get<Lot[]>('/lots');
      setLots(res.data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadData();
    loadLots();
  }, []);

  const handleSave = async (data: FinancialForm) => {
    const payload = {
      type: data.type,
      category: data.category,
      description: data.description || null,
      value: Number(data.value),
      date: data.date,
      lot_id: data.lot_id ? Number(data.lot_id) : null,
    };
    try {
      if (editing) {
        await api.put(`/financial/${editing.id}`, payload);
      } else {
        await api.post('/financial', payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ type: 'IN', category: '', description: '', value: '', date: '', lot_id: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleEdit = (r: FinancialRecord) => {
    setEditing(r);
    setForm({
      type: r.type,
      category: r.category,
      description: r.description || '',
      value: r.value.toString(),
      date: r.date,
      lot_id: r.lot_id ? String(r.lot_id) : '',
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/financial/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ type: 'IN', category: '', description: '', value: '', date: '', lot_id: '' });
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
      <Typography variant="h4" gutterBottom>Financeiro</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Novo registro</Button>
      <FinancialTable records={records} onEdit={handleEdit} onDelete={handleDelete} />
      <FinancialDialog
        open={open}
        editing={!!editing}
        initialForm={form}
        lots={lots}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default FinancialPage;