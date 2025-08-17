import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import type { Lot } from '../Lots/LotsTable';
import { FINANCIAL_CATEGORIES } from '../../utils/format';
import { getEnums } from '../../services/meta';

export interface FinancialForm {
  type: string;
  category: string;
  description: string;
  value: string;
  date: string;
  lot_id: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: FinancialForm;
  lots: Lot[];
  onClose: () => void;
  onSave: (form: FinancialForm) => void;
}

const FinancialDialog: React.FC<Props> = ({
  open,
  editing,
  initialForm,
  lots,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<FinancialForm>(initialForm);
  const [categories, setCategories] = useState(FINANCIAL_CATEGORIES);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  useEffect(() => {
    const load = async () => {
      try {
        const meta = await getEnums();
        if (meta.financial_categories?.length) {
          setCategories(
            meta.financial_categories.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))
          );
        }
      } catch {
        // ignore, fall back to defaults
      }
    };
    load();
  }, []);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Novo'} Registro Financeiro</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            value={form.type}
            label="Tipo"
            onChange={e => setForm({ ...form, type: e.target.value as string })}
          >
            <MenuItem value="IN">Entrada</MenuItem>
            <MenuItem value="OUT">Saída</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="cat-label">Categoria</InputLabel>
          <Select
            labelId="cat-label"
            value={form.category}
            label="Categoria"
            onChange={e => setForm({ ...form, category: e.target.value as string })}
          >
            {categories.map(c => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Descrição" fullWidth margin="dense" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <TextField
          label="Valor"
          fullWidth
          margin="dense"
          inputMode="decimal"
          placeholder="0,00"
          value={form.value}
          onChange={e => {
            const v = e.target.value.replace(/[^0-9,.-]/g, '');
            setForm({ ...form, value: v });
          }}
        />
        <TextField label="Data" type="date" fullWidth margin="dense" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} InputLabelProps={{ shrink: true }} />
        <FormControl fullWidth margin="dense">
          <InputLabel id="lot-label">Lote</InputLabel>
          <Select
            labelId="lot-label"
            value={form.lot_id}
            label="Lote"
            onChange={e => setForm({ ...form, lot_id: e.target.value as string })}
          >
            <MenuItem value="">Nenhum</MenuItem>
            {lots.map(l => (
              <MenuItem key={l.id} value={String(l.id)}>{l.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinancialDialog;
