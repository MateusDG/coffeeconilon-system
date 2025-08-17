import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import api from '../services/api';
import FinancialTable, { FinancialRecord } from '../components/Financial/FinancialTable';
import FinancialDialog, { FinancialForm } from '../components/Financial/FinancialDialog';
import type { Lot } from '../components/Lots/LotsTable';
import { parseCurrency, toApiDate, fromApiDateToIso } from '../utils/format';
import { FinancialService } from '../services/financial';

const FinancialPage: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FinancialRecord | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [form, setForm] = useState<FinancialForm>({
    type: 'IN',
    category: 'sale',
    description: '',
    value: '',
    date: '',
    lot_id: '',
  });

  const loadData = async () => {
    try {
      const rows = await FinancialService.list();
      // Defensive: ensure value numeric and date present
      setRecords(rows.map(r => ({
        ...r,
        value: Number((r as any).value),
        date: r.date || '',
      })));
    } catch (e: any) {
      const msg = e?.response?.data?.detail || 'Erro ao carregar dados';
      setError(typeof msg === 'string' ? msg : 'Erro ao carregar dados');
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
    const extractMsg = (e: any) => {
      const detail = e?.response?.data?.detail;
      if (!detail) return 'Erro ao salvar';
      if (typeof detail === 'string') return detail;
      if (Array.isArray(detail) && detail.length) {
        const first = detail[0];
        // Pydantic error format
        return first?.msg || JSON.stringify(first);
      }
      return 'Erro ao salvar';
    };
    const payload: any = {
      type: data.type,
      category: data.category,
      description: data.description || null,
      lot_id: data.lot_id ? Number(data.lot_id) : null,
    };
    // For create, value and date are required; for update, include only if provided
    const parsedValue = parseCurrency(data.value);
    if (!editing) {
      if (!data.value || isNaN(parsedValue) || parsedValue <= 0) {
        setError('Informe um valor válido (> 0).');
        return;
      }
      if (!data.date) {
        setError('Informe uma data.');
        return;
      }
      payload.value = parsedValue;
      payload.date = toApiDate(data.date);
    } else {
      if (data.value) {
        if (isNaN(parsedValue) || parsedValue <= 0) {
          setError('Valor inválido.');
          return;
        }
        payload.value = parsedValue;
      }
      if (data.date) {
        payload.date = toApiDate(data.date);
      }
    }
    try {
      if (editing) {
        await FinancialService.update(editing.id, payload);
      } else {
        await FinancialService.create(payload);
      }
      setOpen(false);
      setEditing(null);
      setForm({ type: 'IN', category: 'sale', description: '', value: '', date: '', lot_id: '' });
      await loadData();
    } catch (e: any) {
      setError(extractMsg(e));
    }
  };

  const handleEdit = (r: FinancialRecord) => {
    setEditing(r);
    setForm({
      type: r.type,
      category: r.category,
      description: r.description || '',
      value: r.value.toString(),
      date: fromApiDateToIso(r.date),
      lot_id: r.lot_id ? String(r.lot_id) : '',
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await FinancialService.remove(id);
      loadData();
    } catch {
      setError('Erro ao excluir');
    }
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ type: 'IN', category: 'sale', description: '', value: '', date: '', lot_id: '' });
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
