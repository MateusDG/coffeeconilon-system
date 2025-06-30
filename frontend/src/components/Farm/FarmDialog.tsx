import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export interface FarmForm {
  name: string;
  location: string;
  owner_id: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: FarmForm;
  onClose: () => void;
  onSave: (form: FarmForm) => void;
}

const FarmDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave }) => {
  const [form, setForm] = useState<FarmForm>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Nova'} Fazenda</DialogTitle>
      <DialogContent>
        <TextField label="Nome" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <TextField label="Localização" fullWidth margin="dense" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <TextField label="Owner ID" fullWidth margin="dense" value={form.owner_id} onChange={e => setForm({ ...form, owner_id: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FarmDialog;