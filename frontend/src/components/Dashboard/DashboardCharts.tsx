import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
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
import api from '../../services/api';
import { FinancialRecord } from '../Financial/FinancialTable';
import { StockRecord } from '../Inventory/InventoryTable';

interface FinChartData {
  month: string;
  total: number;
}

interface StockChartData {
  product: string;
  quantity: number;
}

const DashboardCharts: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinChartData[]>([]);
  const [stockData, setStockData] = useState<StockChartData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [finRes, stockRes] = await Promise.all([
          api.get<FinancialRecord[]>('/financial'),
          api.get<StockRecord[]>('/stocks'),
        ]);

        const finTotals: { [month: string]: number } = {};
        finRes.data.forEach(rec => {
          const month = new Date(rec.date).toISOString().slice(0, 7);
          finTotals[month] = (finTotals[month] || 0) + Number(rec.value);
        });
        setFinancialData(
          Object.entries(finTotals).map(([month, total]) => ({ month, total }))
        );

        const stockTotals: { [product: string]: number } = {};
        stockRes.data.forEach(rec => {
          stockTotals[rec.product] =
            (stockTotals[rec.product] || 0) + Number(rec.quantity);
        });
        setStockData(
          Object.entries(stockTotals).map(([product, quantity]) => ({
            product,
            quantity,
          }))
        );
      } catch {
        // ignore errors in demo
      }
    };
    load();
  }, []);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Fluxo financeiro mensal
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
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