import React from 'react';
import { Grid, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { formatCurrency, formatNumber } from '../../utils/format';

interface Props {
  data: any;
}

const ReportSummary: React.FC<Props> = ({ data }) => {
  const fin = data?.financial_summary || { total_in: 0, total_out: 0, net: 0 };
  const stocks = Array.isArray(data?.stock_summary) ? data.stock_summary : [];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Entradas</Typography>
          <Typography variant="h6">{formatCurrency(Number(fin.total_in || 0))}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Saídas</Typography>
          <Typography variant="h6">{formatCurrency(Number(fin.total_out || 0))}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Resultado</Typography>
          <Typography variant="h6">{formatCurrency(Number(fin.net || 0))}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Estoque por produto</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell>Unidade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((row: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{row.product}</TableCell>
                  <TableCell align="right">{formatNumber(Number(row.quantity), 3)}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportSummary;
