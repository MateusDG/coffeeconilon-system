import React, { useState, useEffect } from 'react';
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

export interface CropForm {
  lot_id: string;
  planted_date: string;
  harvested_date: string;
  yield_bags: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: CropForm;
  lots: Lot[];
  onClose: () => void;
  onSave: (form: CropForm) => void;
}

const CropDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave, lots }) => {
  const [form, setForm] = useState<CropForm>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Nova'} Safra</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="lot-label">Lote</InputLabel>
          <Select
            labelId="lot-label"
            value={form.lot_id}
            label="Lote"
            onChange={e => setForm({ ...form, lot_id: e.target.value as string })}
          >
            {lots.map(l => (
              <MenuItem key={l.id} value={String(l.id)}>
                {l.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Data Plantio" fullWidth margin="dense" value={form.planted_date} onChange={e => setForm({ ...form, planted_date: e.target.value })} />
        <TextField label="Data Colheita" fullWidth margin="dense" value={form.harvested_date} onChange={e => setForm({ ...form, harvested_date: e.target.value })} />
        <TextField label="Sacas" fullWidth margin="dense" value={form.yield_bags} onChange={e => setForm({ ...form, yield_bags: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
