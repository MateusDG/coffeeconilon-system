import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
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
  onExpand?: () => void;
  onExpandStocks?: () => void;
}

interface FinChartData {
  month: string;
  total: number;
}

interface StockChartData {
  product: string;
  quantity: number;
}

const DashboardCharts: React.FC<Props> = ({ financial, stocks, from, to, onExpand, onExpandStocks }) => {
  const [financialData, setFinancialData] = useState<FinChartData[]>([]);
  const [stockData, setStockData] = useState<StockChartData[]>([]);

  const inRange = (d: string) => {
    const dt = parseApiDate(d);
    const start = new Date(from.getFullYear(), from.getMonth(), 1);
    const end = new Date(to.getFullYear(), to.getMonth() + 1, 0, 23, 59, 59);
    return dt >= start && dt <= end;
  };

  useEffect(() => {
    const finTotals: { [month: string]: number } = {};
    financial.filter(f => inRange(f.date)).forEach(rec => {
      const dt = parseApiDate(rec.date);
      const month = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
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
          {onExpand && <Button size="small" onClick={onExpand}>Ver detalhes</Button>}
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Estoque por produto
          </Typography>
          {onExpandStocks && <Button size="small" onClick={onExpandStocks}>Ver detalhes</Button>}
        </Box>
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
