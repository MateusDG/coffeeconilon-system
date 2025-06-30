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
import type { Farm } from '../Farm/FarmsTable';

export interface LotForm {
  name: string;
  area_ha: string;
  farm_id: string;
  crop_year: string;
}

interface Props {
  open: boolean;
  editing?: boolean;
  initialForm: LotForm;
  farms: Farm[];
  onClose: () => void;
  onSave: (form: LotForm) => void;
}

const LotDialog: React.FC<Props> = ({ open, editing, initialForm, onClose, onSave, farms }) => {
  const [form, setForm] = useState<LotForm>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Editar' : 'Novo'} Lote</DialogTitle>
      <DialogContent>
        <TextField label="Nome" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <TextField label="Área (ha)" fullWidth margin="dense" value={form.area_ha} onChange={e => setForm({ ...form, area_ha: e.target.value })} />
        <FormControl fullWidth margin="dense">
          <InputLabel id="farm-label">Fazenda</InputLabel>
          <Select
            labelId="farm-label"
            value={form.farm_id}
            label="Fazenda"
            onChange={e => setForm({ ...form, farm_id: e.target.value as string })}
          >
            {farms.map(f => (
              <MenuItem key={f.id} value={String(f.id)}>
                {f.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Ano Safra" fullWidth margin="dense" value={form.crop_year} onChange={e => setForm({ ...form, crop_year: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LotDialog;