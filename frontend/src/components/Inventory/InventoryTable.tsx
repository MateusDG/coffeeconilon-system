import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export interface StockRecord {
  id: number;
  product: string;
  movement: string;
  quantity: number;
  unit: string;
  date: string;
}

const InventoryTable: React.FC<{ records: StockRecord[] }> = ({ records }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Produto</TableCell>
          <TableCell>Movimento</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Unidade</TableCell>
          <TableCell>Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map(r => (
          <TableRow key={r.id}>
            <TableCell>{r.product}</TableCell>
            <TableCell>{r.movement}</TableCell>
            <TableCell>{r.quantity}</TableCell>
            <TableCell>{r.unit}</TableCell>
            <TableCell>{r.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default InventoryTable;