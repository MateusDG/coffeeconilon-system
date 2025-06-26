import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export interface FinancialRecord {
  id: number;
  type: string;
  category: string;
  description?: string;
  value: number;
  date: string;
  crop_id?: number;
  lot_id?: number;
}

const FinancialTable: React.FC<{ records: FinancialRecord[] }> = ({ records }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tipo</TableCell>
          <TableCell>Categoria</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Valor</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Lote</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map(r => (
          <TableRow key={r.id}>
            <TableCell>{r.type}</TableCell>
            <TableCell>{r.category}</TableCell>
            <TableCell>{r.description || ''}</TableCell>
            <TableCell>{r.value}</TableCell>
            <TableCell>{r.date}</TableCell>
            <TableCell>{r.lot_id ?? ''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FinancialTable;