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

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

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
        <TextField label="Quantidade" fullWidth margin="dense" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <TextField label="Unidade" fullWidth margin="dense" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
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