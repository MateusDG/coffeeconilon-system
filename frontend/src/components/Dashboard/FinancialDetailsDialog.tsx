import React, { useEffect, useMemo, useState } from 'react';
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
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from '@mui/material';
import { FinancialRecord } from '../Financial/FinancialTable';
import { parseApiDate, formatCurrency } from '../../utils/format';

interface Props {
  open: boolean;
  onClose: () => void;
  financial: FinancialRecord[];
  from?: Date;
  to?: Date;
}

const FinancialDetailsDialog: React.FC<Props> = ({ open, onClose, financial, from, to }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const months = useMemo(() => {
    const set = new Set<string>();
    const inRange = (d: string) => {
      const dt = parseApiDate(d);
      if (from && to) {
        const start = new Date(from.getFullYear(), from.getMonth(), 1);
        const end = new Date(to.getFullYear(), to.getMonth() + 1, 0, 23, 59, 59);
        return dt >= start && dt <= end;
      }
      return true;
    };
    financial.filter(f => inRange(f.date)).forEach(rec => {
      const dt = parseApiDate(rec.date);
      const m = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      set.add(m);
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [financial, from, to]);

  useEffect(() => {
    if (months.length && !selectedMonth) setSelectedMonth(months[0]);
  }, [months, selectedMonth]);

  const { items, totalIn, totalOut, net } = useMemo(() => {
    if (!selectedMonth) return { items: [] as FinancialRecord[], totalIn: 0, totalOut: 0, net: 0 };
    const items = financial.filter(rec => {
      const dt = parseApiDate(rec.date);
      const m = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      return m === selectedMonth;
    });
    const totalIn = items.filter(i => i.type === 'IN').reduce((a, b) => a + Number((b as any).value || 0), 0);
    const totalOut = items.filter(i => i.type === 'OUT').reduce((a, b) => a + Number((b as any).value || 0), 0);
    const net = totalIn - totalOut;
    return { items, totalIn, totalOut, net };
  }, [financial, selectedMonth]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalhes do fluxo financeiro mensal</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="month-label">Mês</InputLabel>
          <Select labelId="month-label" value={selectedMonth} label="Mês" onChange={e => setSelectedMonth(e.target.value)}>
            {months.map(m => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ my: 2 }}>
          <Typography variant="body1">Entradas: {formatCurrency(totalIn)}</Typography>
          <Typography variant="body1">Saídas: {formatCurrency(totalOut)}</Typography>
          <Typography variant="body1">Resultado: {formatCurrency(net)}</Typography>
        </Stack>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Lote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(it => (
              <TableRow key={it.id}>
                <TableCell>{it.date}</TableCell>
                <TableCell>{it.type}</TableCell>
                <TableCell>{it.category}</TableCell>
                <TableCell>{it.description || ''}</TableCell>
                <TableCell align="right">{formatCurrency(Number((it as any).value))}</TableCell>
                <TableCell>{it.lot_id || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinancialDetailsDialog;

