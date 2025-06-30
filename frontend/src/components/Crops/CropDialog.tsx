import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

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
  onClose: () => void;
  onSave: (form: CropForm) => void;
}

const CropDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave }) => {
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
        <TextField label="Lot ID" fullWidth margin="dense" value={form.lot_id} onChange={e => setForm({ ...form, lot_id: e.target.value })} />
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