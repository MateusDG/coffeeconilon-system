import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export interface FinancialRecord {
  id: number;
  type: string;
  category: string;
  value: number;
  date: string;
}

const FinancialTable: React.FC<{ records: FinancialRecord[] }> = ({ records }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tipo</TableCell>
          <TableCell>Categoria</TableCell>
          <TableCell>Valor</TableCell>
          <TableCell>Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map(r => (
          <TableRow key={r.id}>
            <TableCell>{r.type}</TableCell>
            <TableCell>{r.category}</TableCell>
            <TableCell>{r.value}</TableCell>
            <TableCell>{r.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FinancialTable;