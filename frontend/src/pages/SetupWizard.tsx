import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContexts';

const ALL_STEPS = ['Fazenda', 'Lote', 'Safra'] as const;

const SetupWizard: React.FC = () => {
  const { token } = useAuth();
  const [active, setActive] = useState(0);
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<string[]>([...ALL_STEPS]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [farmForm, setFarmForm] = useState({ name: '', location: '' });
  const [farmId, setFarmId] = useState<number | null>(null);

  const [lotForm, setLotForm] = useState({ name: '', area_ha: '', crop_year: '' });
  const [lotId, setLotId] = useState<number | null>(null);

  const [cropForm, setCropForm] = useState({ planted_date: '', harvested_date: '', yield_bags: '' });

  // Load context and status
  useEffect(() => {
    const init = async () => {
      try {
        if (token) {
          const me = await api.get('/auth/me');
          setCurrentUserId(me.data.id);
        }
        const st = await api.get('/onboarding/status');
        const s = [] as string[];
        if (!st.data.hasFarm) s.push('Fazenda');
        if (!st.data.hasLot) s.push('Lote');
        if (!st.data.hasCrop) s.push('Safra');
        setSteps(s.length ? s : [...ALL_STEPS]);
      } catch {
        setSteps([...ALL_STEPS]);
      }
    };
    init();
  }, [token]);

  const handleFarm = async () => {
    try {
      const payload = { ...farmForm, owner_id: currentUserId };
      const res = await api.post('/farms', payload);
      setFarmId(res.data.id);
      setActive((i) => i + 1);
      setError('');
    } catch {
      setError('Erro ao salvar fazenda');
    }
  };

  const handleLot = async () => {
    try {
      const payload = {
        name: lotForm.name,
        area_ha: Number(lotForm.area_ha),
        farm_id: farmId,
        crop_year: lotForm.crop_year ? Number(lotForm.crop_year) : undefined
      };
      const res = await api.post('/lots', payload);
      setLotId(res.data.id);
      setActive((i) => i + 1);
      setError('');
    } catch {
      setError('Erro ao salvar lote');
    }
  };

  const handleCrop = async () => {
    try {
      const payload = {
        lot_id: lotId,
        planted_date: cropForm.planted_date,
        harvested_date: cropForm.harvested_date || null,
        yield_bags: cropForm.yield_bags ? Number(cropForm.yield_bags) : null
      };
      await api.post('/crops', payload);
      setActive((i) => i + 1);
      setError('');
    } catch {
      setError('Erro ao salvar safra');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Assistente Inicial</Typography>
      <Stepper activeStep={active} alternativeLabel sx={{ mb: 3 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Complete as etapas para cadastrar rapidamente sua fazenda, lote e safra. Você pode pular e concluir depois.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {steps[active] === 'Fazenda' && (
        <Box>
          <TextField label="Nome" fullWidth margin="dense" value={farmForm.name} onChange={e => setFarmForm({ ...farmForm, name: e.target.value })} />
          <TextField label="Localização" fullWidth margin="dense" value={farmForm.location} onChange={e => setFarmForm({ ...farmForm, location: e.target.value })} />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => setActive((i)=> i+1)}>Pular</Button>
            <Button variant="contained" onClick={handleFarm}>Próximo</Button>
          </Box>
        </Box>
      )}

      {steps[active] === 'Lote' && (
        <Box>
          <TextField label="Nome" fullWidth margin="dense" value={lotForm.name} onChange={e => setLotForm({ ...lotForm, name: e.target.value })} />
          <TextField label="Área (ha)" fullWidth margin="dense" value={lotForm.area_ha} onChange={e => setLotForm({ ...lotForm, area_ha: e.target.value })} />
          <TextField label="Ano Safra" fullWidth margin="dense" value={lotForm.crop_year} onChange={e => setLotForm({ ...lotForm, crop_year: e.target.value })} />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => setActive((i)=> i+1)}>Pular</Button>
            <Button variant="contained" onClick={handleLot}>Próximo</Button>
          </Box>
        </Box>
      )}

      {steps[active] === 'Safra' && (
        <Box>
          <TextField type="date" label="Data Plantio" fullWidth margin="dense" value={cropForm.planted_date} onChange={e => setCropForm({ ...cropForm, planted_date: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField type="date" label="Data Colheita" fullWidth margin="dense" value={cropForm.harvested_date} onChange={e => setCropForm({ ...cropForm, harvested_date: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField label="Sacas" fullWidth margin="dense" value={cropForm.yield_bags} onChange={e => setCropForm({ ...cropForm, yield_bags: e.target.value })} />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => setActive((i)=> i+1)}>Pular</Button>
            <Button variant="contained" onClick={handleCrop}>Concluir</Button>
          </Box>
        </Box>
      )}

      {active >= steps.length && (
        <Typography sx={{ mt: 2 }}>Cadastro concluído!</Typography>
      )}
    </Box>
  );
};

export default SetupWizard;
