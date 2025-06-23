import React, { useEffect, useState } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import api from '../services/api';

interface FinancialRecord {
  id: number;
  type: string;
  category: string;
  value: number;
  date: string;
}

const FinancialPage: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  useEffect(() => {
    api.get<FinancialRecord[]>('/financial').then(res => setRecords(res.data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Financeiro</Typography>
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
    </>
  );
};

export default FinancialPage;