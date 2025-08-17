import React, { useEffect, useMemo, useState } from 'react';
<<<<<<< HEAD
import { Grid, Typography, Box, Button } from '@mui/material';
=======
import { Grid, Typography } from '@mui/material';
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { FinancialRecord } from '../Financial/FinancialTable';
import { StockRecord } from '../Inventory/InventoryTable';
import { parseApiDate } from '../../utils/format';

interface Props {
  financial: FinancialRecord[];
  stocks: StockRecord[];
  from: Date;
  to: Date;
<<<<<<< HEAD
  onExpand?: () => void;
}
=======
}
<<<<<<< HEAD
=======

interface Props {
  financial: FinancialRecord[];
  stocks: StockRecord[];
  from: Date;
  to: Date;
}
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7

interface FinChartData {
  month: string;
  total: number;
}

interface StockChartData {
  product: string;
  quantity: number;
}

<<<<<<< HEAD
const DashboardCharts: React.FC<Props> = ({ financial, stocks, from, to, onExpand }) => {
=======
const DashboardCharts: React.FC<Props> = ({ financial, stocks, from, to }) => {
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
  const [financialData, setFinancialData] = useState<FinChartData[]>([]);
  const [stockData, setStockData] = useState<StockChartData[]>([]);

  const inRange = (d: string) => {
<<<<<<< HEAD
    const dt = parseApiDate(d);
=======
<<<<<<< HEAD
    const dt = parseApiDate(d);
=======
<<<<<<< HEAD
    const dt = parseApiDate(d);
=======
    const dt = new Date(d);
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
    const start = new Date(from.getFullYear(), from.getMonth(), 1);
    const end = new Date(to.getFullYear(), to.getMonth() + 1, 0, 23, 59, 59);
    return dt >= start && dt <= end;
  };

  useEffect(() => {
    const finTotals: { [month: string]: number } = {};
    financial.filter(f => inRange(f.date)).forEach(rec => {
<<<<<<< HEAD
      const dt = parseApiDate(rec.date);
      const month = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
=======
<<<<<<< HEAD
      const dt = parseApiDate(rec.date);
      const month = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
=======
<<<<<<< HEAD
      const dt = parseApiDate(rec.date);
      const month = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
=======
      const month = new Date(rec.date).toISOString().slice(0, 7);
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
      const delta = rec.type === 'OUT' ? -Number(rec.value) : Number(rec.value);
      finTotals[month] = (finTotals[month] || 0) + delta;
    });
    setFinancialData(
      Object.entries(finTotals)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, total]) => ({ month, total }))
    );

    const stockTotals: { [product: string]: number } = {};
    stocks.filter(s => inRange(s.date)).forEach(rec => {
      stockTotals[rec.product] =
        (stockTotals[rec.product] || 0) + Number(rec.quantity) * (rec.movement === 'OUT' ? -1 : 1);
    });
    setStockData(
      Object.entries(stockTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([product, quantity]) => ({ product, quantity }))
    );
  }, [financial, stocks, from, to]);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Fluxo financeiro mensal
          </Typography>
          <Button size="small" onClick={onExpand}>Ver detalhes</Button>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#4BAE4F" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Estoque por produto
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
