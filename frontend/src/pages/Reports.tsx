import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Alert, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import api from '../services/api';
import ReportSummary from '../components/Reports/ReportSummary';
import { toApiDate } from '../utils/format';
import type { Farm } from '../components/Farm/FarmsTable';
import type { Lot } from '../components/Lots/LotsTable';

const ReportsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [farms, setFarms] = useState<Farm[]>([]);
  const storedFarmId = typeof window !== 'undefined' ? localStorage.getItem('reports.farmId') : null;
  const [farmId, setFarmId] = useState<string>(storedFarmId || '');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const storedLotId = typeof window !== 'undefined' ? localStorage.getItem('reports.lotId') : null;
  const [lotId, setLotId] = useState<string>(storedLotId || '');
  const [lots, setLots] = useState<Lot[]>([]);

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    try {
      const params: any = {};
      if (farmId) params.farm_id = Number(farmId);
      if (start) params.start_date = toApiDate(start);
      if (end) params.end_date = toApiDate(end);
      if (lotId) params.lot_id = Number(lotId);
      const res = await api.get('/reports', { params });
      setData(res.data);
    } catch (e: any) {
      const detail = e?.response?.data?.detail;
      if (typeof detail === 'string') setError(detail);
      else if (Array.isArray(detail) && detail[0]?.msg) setError(detail[0].msg);
      else setError('Erro ao carregar relatórios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
        const fr = await api.get('/farms');
        setFarms(fr.data || []);
        const lt = await api.get('/lots');
        setLots(lt.data || []);
      } catch {}
      await fetchReport();
<<<<<<< HEAD
=======
=======
        const res = await api.get('/reports');
        setData(res.data);
      } catch (e: any) {
        const detail = e?.response?.data?.detail;
        if (typeof detail === 'string') setError(detail);
        else if (Array.isArray(detail) && detail[0]?.msg) setError(detail[0].msg);
        else setError('Erro ao carregar relatórios');
      } finally {
        setLoading(false);
      }
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
    };
    init();
  }, []);

  // Reset lot if farm changes and selected lot no longer belongs
  useEffect(() => {
    if (!lotId) return;
    const lot = lots.find(l => String(l.id) === lotId);
    if (!lot || (farmId && String(l.farm_id) !== farmId)) {
      setLotId('');
      localStorage.setItem('reports.lotId', '');
    }
  }, [farmId, lots, lotId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>Relatórios</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="farm-label">Fazenda</InputLabel>
          <Select
            labelId="farm-label"
            label="Fazenda"
            value={farmId}
            onChange={(e) => { setFarmId(e.target.value as string); localStorage.setItem('reports.farmId', e.target.value as string); }}
          >
            <MenuItem value="">Todas</MenuItem>
            {farms.map(f => (
              <MenuItem key={f.id} value={String(f.id)}>{f.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="lot-label">Lote</InputLabel>
          <Select
            labelId="lot-label"
            label="Lote"
            value={lotId}
            onChange={(e) => { setLotId(e.target.value as string); localStorage.setItem('reports.lotId', e.target.value as string); }}
          >
            <MenuItem value="">Todos</MenuItem>
            {lots
              .filter(l => !farmId || String(l.farm_id) === farmId)
              .map(l => (
                <MenuItem key={l.id} value={String(l.id)}>{l.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField label="De" type="date" size="small" value={start} onChange={e => setStart(e.target.value)} />
        <TextField label="Até" type="date" size="small" value={end} onChange={e => setEnd(e.target.value)} />
        <Button variant="contained" onClick={fetchReport}>Atualizar</Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <ReportSummary data={data} />
    </>
  );
};

export default ReportsPage;
