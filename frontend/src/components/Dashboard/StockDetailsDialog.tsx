import React, { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { StockRecord } from '../Inventory/InventoryTable';
import { parseApiDate, formatNumber } from '../../utils/format';

interface Props {
  open: boolean;
  onClose: () => void;
  stocks: StockRecord[];
  from?: Date;
  to?: Date;
}

const StockDetailsDialog: React.FC<Props> = ({ open, onClose, stocks, from, to }) => {
  const inRange = (d: string) => {
    const dt = parseApiDate(d);
    if (from && to) {
      const start = new Date(from.getFullYear(), from.getMonth(), 1);
      const end = new Date(to.getFullYear(), to.getMonth() + 1, 0, 23, 59, 59);
      return dt >= start && dt <= end;
    }
    return true;
  };

  const filtered = useMemo(() => stocks.filter(s => inRange(s.date)), [stocks]);

  const totalsByProduct = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach(rec => {
      const delta = Number(rec.quantity) * (rec.movement === 'OUT' ? -1 : 1);
      map.set(rec.product, (map.get(rec.product) || 0) + delta);
    });
    return Array.from(map.entries())
      .map(([product, quantity]) => ({ product, quantity }))
      .sort((a, b) => Math.abs(b.quantity) - Math.abs(a.quantity));
  }, [filtered]);

  const downloadCsv = (filename: string, rows: string[][]) => {
    const csv = rows.map(r => r.map(f => `"${String(f ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportTotalsCsv = () => {
    const header = ['Produto', 'Quantidade'];
    const rows = totalsByProduct.map(r => [r.product, String(Number(r.quantity))]);
    downloadCsv('estoque_totais.csv', [header, ...rows]);
  };

  const exportMovementsCsv = () => {
    const header = ['Data', 'Produto', 'Movimento', 'Quantidade', 'Unidade', 'Lote'];
    const rows = filtered.map(it => [
      it.date,
      it.product,
      it.movement,
      String(Number(it.quantity)),
      it.unit,
      it.lot_id ? String(it.lot_id) : '',
    ]);
    downloadCsv('estoque_movimentos.csv', [header, ...rows]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalhes do estoque por produto</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>Totais por produto no período</Typography>
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalsByProduct.map(row => (
              <TableRow key={row.product}>
                <TableCell>{row.product}</TableCell>
                <TableCell align="right">{formatNumber(Number(row.quantity), 3)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="subtitle1" gutterBottom>Movimentos no período</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Movimento</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell>Lote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(it => (
              <TableRow key={it.id}>
                <TableCell>{it.date}</TableCell>
                <TableCell>{it.product}</TableCell>
                <TableCell>{it.movement}</TableCell>
                <TableCell align="right">{formatNumber(Number(it.quantity), 3)}</TableCell>
                <TableCell>{it.unit}</TableCell>
                <TableCell>{it.lot_id || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={exportTotalsCsv}>Exportar CSV (totais)</Button>
        <Button onClick={exportMovementsCsv}>Exportar CSV (movimentos)</Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDetailsDialog;
