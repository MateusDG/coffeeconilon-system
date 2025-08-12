import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Typography, Grid, Box, Stack, Button, TextField, Skeleton, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import api from '../services/api';
import KpiCard from '../components/Dashboard/KpiCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import LowInventoryAlert from '../components/Dashboard/LowInventoryAlert';
import TasksPanel from '../components/Dashboard/TasksPanel';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import type { FinancialRecord } from '../components/Financial/FinancialTable';
import type { StockRecord } from '../components/Inventory/InventoryTable';
import type { Lot } from '../components/Lots/LotsTable';
import type { Farm } from '../components/Farm/FarmsTable';
const DashboardCharts = React.lazy(() => import('../components/Dashboard/DashboardCharts'));


const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [financial, setFinancial] = useState<FinancialRecord[]>([]);
  const [stocks, setStocks] = useState<StockRecord[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [lots, setLots] = useState<Lot[]>([]);
  const today = new Date();
  const storedFrom = localStorage.getItem('dashboard.fromMonth');
  const storedTo = localStorage.getItem('dashboard.toMonth');
  const storedThreshold = localStorage.getItem('dashboard.lowThreshold');
  const storedWelcomeDismissed = localStorage.getItem('dashboard.welcomeDismissed') === '1';
  const [fromMonth, setFromMonth] = useState(() => storedFrom ? new Date(Number(storedFrom.split('-')[0]), Number(storedFrom.split('-')[1]) - 1, 1) : new Date(today.getFullYear(), today.getMonth() - 2, 1));
  const [toMonth, setToMonth] = useState(() => storedTo ? new Date(Number(storedTo.split('-')[0]), Number(storedTo.split('-')[1]) - 1, 1) : new Date(today.getFullYear(), today.getMonth(), 1));
  const [lowThreshold, setLowThreshold] = useState<number>(() => storedThreshold ? Number(storedThreshold) : 5);
  const [welcomeDismissed, setWelcomeDismissed] = useState<boolean>(storedWelcomeDismissed);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fin, stk, usr, fr, lt] = await Promise.all([
          api.get('/financial'),
          api.get('/stocks'),
          api.get('/users'),
          api.get('/farms'),
          api.get('/lots'),
        ]);
        setFinancial(fin.data);
        setStocks(stk.data);
        setUsers(usr.data);
        setFarms(fr.data);
        setLots(lt.data);
      } catch (e) {
        setError('Falha ao carregar dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { finValueNow, finValuePrev, stockCountNow, stockCountPrev } = useMemo(() => {
    const start = new Date(fromMonth.getFullYear(), fromMonth.getMonth(), 1);
    const end = new Date(toMonth.getFullYear(), toMonth.getMonth() + 1, 0, 23, 59, 59);

    const monthsSpan = (toMonth.getFullYear() - fromMonth.getFullYear()) * 12 + (toMonth.getMonth() - fromMonth.getMonth()) + 1;
    const prevEnd = new Date(start);
    prevEnd.setDate(0); // last day before start
    const prevStart = new Date(prevEnd.getFullYear(), prevEnd.getMonth() - (monthsSpan - 1), 1);

    const inRange = (d: string) => {
      const dt = new Date(d);
      return dt >= start && dt <= end;
    };
    const inPrevRange = (d: string) => {
      const dt = new Date(d);
      return dt >= prevStart && dt <= prevEnd;
    };

    const finNow = financial.filter(f => inRange(f.date));
    const finPrev = financial.filter(f => inPrevRange(f.date));
    // Sum IN - OUT
    const sumFin = (arr: any[]) => arr.reduce((acc, r) => acc + (r.type === 'IN' ? Number(r.value) : -Number(r.value || 0)), 0);
    const finValueNow = sumFin(finNow);
    const finValuePrev = sumFin(finPrev);

    const stockNow = stocks.filter(s => inRange(s.date));
    const stockPrev = stocks.filter(s => inPrevRange(s.date));

    return {
      finValueNow,
      finValuePrev,
      stockCountNow: stockNow.length,
      stockCountPrev: stockPrev.length,
    };
  }, [financial, stocks, fromMonth, toMonth]);

  const toPercentDelta = (now: number, prev: number) => {
    if (!isFinite(prev) || prev === 0) return now === 0 ? 0 : 100; // baseline
    return ((now - prev) / Math.abs(prev)) * 100;
  };

  const monthToInput = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  const inputToMonth = (s: string) => new Date(Number(s.substring(0, 4)), Number(s.substring(5, 7)) - 1, 1);

  useEffect(() => {
    localStorage.setItem('dashboard.fromMonth', monthToInput(fromMonth));
  }, [fromMonth]);
  useEffect(() => {
    localStorage.setItem('dashboard.toMonth', monthToInput(toMonth));
  }, [toMonth]);
  useEffect(() => {
    localStorage.setItem('dashboard.lowThreshold', String(lowThreshold));
  }, [lowThreshold]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ mb: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <WelcomeBanner
            show={!welcomeDismissed && (farms.length === 0 || lots.length === 0 || financial.length === 0 || stocks.length === 0 || users.length <= 1)}
            onDismiss={() => { setWelcomeDismissed(true); localStorage.setItem('dashboard.welcomeDismissed', '1'); }}
          />
          <Stack spacing={2}>
            <Typography variant="h5">{new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite'}, Produtor</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Button variant="contained" startIcon={<AttachMoneyIcon />} component={RouterLink} to="/financial">Novo lançamento</Button>
              <Button variant="outlined" startIcon={<InventoryIcon />} component={RouterLink} to="/lots">Novo lote</Button>
              <Button variant="text" component={RouterLink} to="/reports">Gerar relatório</Button>
              <Box sx={{ flexGrow: 1 }} />
              <TextField
                label="De"
                type="month"
                size="small"
                value={monthToInput(fromMonth)}
                onChange={(e) => setFromMonth(inputToMonth(e.target.value))}
              />
              <TextField
                label="Até"
                type="month"
                size="small"
                value={monthToInput(toMonth)}
                onChange={(e) => setToMonth(inputToMonth(e.target.value))}
              />
            </Stack>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12}>
        {loading ? (
          <Skeleton variant="rounded" height={64} />
        ) : (
          <LowInventoryAlert
            stocks={stocks}
            threshold={lowThreshold}
            action={
              <TextField
                type="number"
                size="small"
                label="Limite"
                value={lowThreshold}
                inputProps={{ min: 0, style: { width: 72 } }}
                onChange={(e) => setLowThreshold(Math.max(0, Number(e.target.value)))}
              />
            }
          />
        )}
      </Grid>

      {/* KPIs */}
      <Grid item xs={12} md={4}>
        {loading ? (
          <Skeleton variant="rounded" height={120} />
        ) : (
          <KpiCard
            icon={<AttachMoneyIcon color="primary" />}
            label="Resultado financeiro"
            value={finValueNow.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            delta={toPercentDelta(finValueNow, finValuePrev)}
            help="Soma de entradas menos saídas no período selecionado, comparado ao período anterior."
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {loading ? (
          <Skeleton variant="rounded" height={120} />
        ) : (
          <KpiCard
            icon={<InventoryIcon color="primary" />}
            label="Movimentos de estoque"
            value={stockCountNow}
            delta={toPercentDelta(stockCountNow, stockCountPrev)}
            help="Total de movimentações de estoque no período selecionado versus período anterior."
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {loading ? (
          <Skeleton variant="rounded" height={120} />
        ) : (
          <KpiCard
            icon={<PeopleIcon color="primary" />}
            label="Produtores ativos"
            value={users.length}
            delta={0}
            help="Quantidade de usuários cadastrados no sistema."
          />
        )}
      </Grid>

      {/* Workbench */}
      <Grid item xs={12} md={6}>
        {loading ? (
          <Skeleton variant="rounded" height={360} />
        ) : (
          <RecentActivity financial={financial} stocks={stocks} />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Suspense fallback={<Skeleton variant="rounded" height={360} />}>
          <DashboardCharts financial={financial} stocks={stocks} from={fromMonth} to={toMonth} />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Skeleton variant="rounded" height={220} />
        ) : (
          <TasksPanel usersCount={users.length} financial={financial} stocks={stocks} farms={farms} lots={lots} />
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
