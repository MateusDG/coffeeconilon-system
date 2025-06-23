import React, { useEffect, useState } from 'react';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import api from '../services/api';

interface Lot {
  id: number;
  name: string;
  area_ha: number;
  farm_id: number;
  crop_year?: number;
}

const LotsPage: React.FC = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lot | null>(null);
  const [form, setForm] = useState({ name: '', area_ha: '', farm_id: '', crop_year: '' });

  const loadData = async () => {
    const res = await api.get<Lot[]>('/lots');
    setLots(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    const data = {
      name: form.name,
      area_ha: Number(form.area_ha),
      farm_id: Number(form.farm_id),
      crop_year: form.crop_year ? Number(form.crop_year) : undefined,
    };
    if (editing) {
      await api.put(`/lots/${editing.id}`, data);
    } else {
      await api.post('/lots', data);
    }
    setOpen(false);
    setEditing(null);
    setForm({ name: '', area_ha: '', farm_id: '', crop_year: '' });
    loadData();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/lots/${id}`);
    loadData();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Lotes</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Novo lote</Button>
      <TableContainer component={Paper} sx={{ mt:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Área (ha)</TableCell>
              <TableCell>Ano Safra</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lots.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.area_ha}</TableCell>
                <TableCell>{l.crop_year}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => { setEditing(l); setForm({ name: l.name, area_ha: String(l.area_ha), farm_id: String(l.farm_id), crop_year: l.crop_year?.toString() || '' }); setOpen(true); }}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(l.id)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editing ? 'Editar' : 'Novo'} Lote</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Área (ha)" fullWidth margin="dense" value={form.area_ha} onChange={e => setForm({ ...form, area_ha: e.target.value })} />
          <TextField label="Farm ID" fullWidth margin="dense" value={form.farm_id} onChange={e => setForm({ ...form, farm_id: e.target.value })} />
          <TextField label="Ano Safra" fullWidth margin="dense" value={form.crop_year} onChange={e => setForm({ ...form, crop_year: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LotsPage;