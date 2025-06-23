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

interface Producer {
  id: number;
  name: string;
  email: string;
}

const ProducersPage: React.FC = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Producer | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const loadData = async () => {
    const res = await api.get<Producer[]>('/users');
    setProducers(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (editing) {
      await api.put(`/users/${editing.id}`, { name: form.name, email: form.email });
    } else {
      await api.post('/users', form);
    }
    setOpen(false);
    setEditing(null);
    setForm({ name: '', email: '', password: '' });
    loadData();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    loadData();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Produtores</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Novo produtor</Button>
      <TableContainer component={Paper} sx={{ mt:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {producers.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => { setEditing(p); setForm({ name: p.name, email: p.email, password: '' }); setOpen(true); }}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editing ? 'Editar' : 'Novo'} Produtor</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          {!editing && (
            <TextField label="Senha" type="password" fullWidth margin="dense" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProducersPage;