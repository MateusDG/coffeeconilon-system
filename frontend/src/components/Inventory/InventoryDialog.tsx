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
import { STOCK_UNITS } from '../../utils/format';
import { getEnums } from '../../services/meta';

export interface StockForm {
  product: string;
  movement: string;
  quantity: string;
  unit: string;
  date: string;
  lot_id: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: StockForm;
  lots: Lot[];
  onClose: () => void;
  onSave: (form: StockForm) => void;
}

const InventoryDialog: React.FC<Props> = ({
  open,
  editing,
  initialForm,
  lots,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<StockForm>(initialForm);
  const [units, setUnits] = useState(STOCK_UNITS);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  useEffect(() => {
    const load = async () => {
      try {
        const meta = await getEnums();
        if (meta.stock_units?.length) {
          setUnits(meta.stock_units.map((u) => ({ value: u, label: u })));
        }
      } catch {
        // ignore fallback
      }
    };
    load();
  }, []);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Nova'} Movimentação de Estoque</DialogTitle>
      <DialogContent>
        <TextField label="Produto" fullWidth margin="dense" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
        <FormControl fullWidth margin="dense">
          <InputLabel id="mov-label">Movimento</InputLabel>
          <Select
            labelId="mov-label"
            value={form.movement}
            label="Movimento"
            onChange={e => setForm({ ...form, movement: e.target.value as string })}
          >
            <MenuItem value="IN">Entrada</MenuItem>
            <MenuItem value="OUT">Saída</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantidade"
          fullWidth
          margin="dense"
          inputMode="decimal"
          placeholder="0,000"
          value={form.quantity}
          onChange={e => {
            const v = e.target.value.replace(/[^0-9,.-]/g, '');
            setForm({ ...form, quantity: v });
          }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="unit-label">Unidade</InputLabel>
          <Select
            labelId="unit-label"
            value={form.unit}
            label="Unidade"
            onChange={e => setForm({ ...form, unit: e.target.value as string })}
          >
            {units.map(u => (
              <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default InventoryDialog;
