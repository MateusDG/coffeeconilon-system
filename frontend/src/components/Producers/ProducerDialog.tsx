import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export interface ProducerForm {
  name: string;
  email: string;
  password?: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: ProducerForm;
  onClose: () => void;
  onSave: (form: ProducerForm) => void;
}

const ProducerDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave }) => {
  const [form, setForm] = useState<ProducerForm>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Novo'} Produtor</DialogTitle>
      <DialogContent>
        <TextField label="Nome" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <TextField label="Email" fullWidth margin="dense" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        {!editing && (
          <TextField label="Senha" type="password" fullWidth margin="dense" value={form.password || ''} onChange={e => setForm({ ...form, password: e.target.value })} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProducerDialog;