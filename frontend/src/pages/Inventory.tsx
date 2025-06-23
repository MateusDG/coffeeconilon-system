import React, { useEffect, useState } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import api from '../services/api';

interface StockRecord {
  id: number;
  product: string;
  movement: string;
  quantity: number;
  unit: string;
  date: string;
}

const InventoryPage: React.FC = () => {
  const [records, setRecords] = useState<StockRecord[]>([]);

  useEffect(() => {
    api.get<StockRecord[]>('/stocks').then(res => setRecords(res.data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Estoque</Typography>
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
    </>
  );
};

export default InventoryPage;