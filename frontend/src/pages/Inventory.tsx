import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';

import InventoryTable, { StockRecord } from '../components/Inventory/InventoryTable';
import InventoryDialog, { StockForm } from '../components/Inventory/InventoryDialog';
import type { Lot } from '../components/Lots/LotsTable';

const InventoryPage: React.FC = () => {
  const [records, setRecords] = useState<StockRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<StockRecord | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [form, setForm] = useState<StockForm>({
    product: '',
    movement: 'IN',
    quantity: '',
    unit: '',
    date: '',
    lot_id: '',
  });

  const loadData = async () => {
    try {
      const res = await api.get<StockRecord[]>('/stocks');
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

  const handleSave = async (data: StockForm) => {
    const payload = {
      product: data.product,
      movement: data.movement,
      quantity: Number(data.quantity),
      unit: data.unit,
      date: data.date,
      lot_id: data.lot_id ? Number(data.lot_id) : null,
    };
    try {
      if (editing) {
        await api.put(`/stocks/${editing.id}`, payload);
      } else {
        await api.post('/stocks', payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ product: '', movement: 'IN', quantity: '', unit: '', date: '', lot_id: '' });
      loadData();
    } catch {
      setError('Erro ao salvar');
    }
  };

  const handleEdit = (r: StockRecord) => {
    setEditing(r);
    setForm({
      product: r.product,
      movement: r.movement,
      quantity: r.quantity.toString(),
      unit: r.unit,
      date: r.date,
      lot_id: r.lot_id ? String(r.lot_id) : '',
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/stocks/${id}`);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ product: '', movement: 'IN', quantity: '', unit: '', date: '', lot_id: '' });
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
      <Typography variant="h4" gutterBottom>Estoque</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button variant="contained" onClick={handleNew}>Nova movimentação</Button>
      <InventoryTable records={records} onEdit={handleEdit} onDelete={handleDelete} />
      <InventoryDialog
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

export default InventoryPage;