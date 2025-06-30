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
import type { Producer } from '../Producers/ProducersTable';

export interface FarmForm {
  name: string;
  location: string;
  owner_id: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: FarmForm;
  users: Producer[];
  onClose: () => void;
  onSave: (form: FarmForm) => void;
}

const FarmDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave, users }) => {
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
        <FormControl fullWidth margin="dense">
          <InputLabel id="owner-label">Produtor</InputLabel>
          <Select
            labelId="owner-label"
            value={form.owner_id}
            label="Produtor"
            onChange={e => setForm({ ...form, owner_id: e.target.value as string })}
          >
            {users.map(u => (
              <MenuItem key={u.id} value={String(u.id)}>
                {u.name}
              </MenuItem>
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

export default FarmDialog;
