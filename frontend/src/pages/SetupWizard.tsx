import React, { useState } from 'react';
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

const steps = ['Produtor', 'Fazenda', 'Lote', 'Safra'];

const SetupWizard: React.FC = () => {
  const [active, setActive] = useState(0);
  const [error, setError] = useState('');

  const [producerForm, setProducerForm] = useState({ name: '', email: '', password: '' });
  const [producerId, setProducerId] = useState<number | null>(null);

  const [farmForm, setFarmForm] = useState({ name: '', location: '' });
  const [farmId, setFarmId] = useState<number | null>(null);

  const [lotForm, setLotForm] = useState({ name: '', area_ha: '', crop_year: '' });
  const [lotId, setLotId] = useState<number | null>(null);

  const [cropForm, setCropForm] = useState({ planted_date: '', harvested_date: '', yield_bags: '' });

  const handleProducer = async () => {
    try {
      const res = await api.post('/users', producerForm);
      setProducerId(res.data.id);
      setActive(1);
      setError('');
    } catch {
      setError('Erro ao salvar produtor');
    }
  };

  const handleFarm = async () => {
    try {
      const payload = { ...farmForm, owner_id: producerId };
      const res = await api.post('/farms', payload);
      setFarmId(res.data.id);
      setActive(2);
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
      setActive(3);
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
      setActive(4);
      setError('');
    } catch {
      setError('Erro ao salvar safra');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Cadastro Inicial</Typography>
      <Stepper activeStep={active} alternativeLabel sx={{ mb: 3 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {active === 0 && (
        <Box>
          <TextField label="Nome" fullWidth margin="dense" value={producerForm.name} onChange={e => setProducerForm({ ...producerForm, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={producerForm.email} onChange={e => setProducerForm({ ...producerForm, email: e.target.value })} />
          <TextField label="Senha" type="password" fullWidth margin="dense" value={producerForm.password} onChange={e => setProducerForm({ ...producerForm, password: e.target.value })} />
          <Button variant="contained" onClick={handleProducer} sx={{ mt: 2 }}>Próximo</Button>
        </Box>
      )}

      {active === 1 && (
        <Box>
          <TextField label="Nome" fullWidth margin="dense" value={farmForm.name} onChange={e => setFarmForm({ ...farmForm, name: e.target.value })} />
          <TextField label="Localização" fullWidth margin="dense" value={farmForm.location} onChange={e => setFarmForm({ ...farmForm, location: e.target.value })} />
          <Button variant="contained" onClick={handleFarm} sx={{ mt: 2 }}>Próximo</Button>
        </Box>
      )}

      {active === 2 && (
        <Box>
          <TextField label="Nome" fullWidth margin="dense" value={lotForm.name} onChange={e => setLotForm({ ...lotForm, name: e.target.value })} />
          <TextField label="Área (ha)" fullWidth margin="dense" value={lotForm.area_ha} onChange={e => setLotForm({ ...lotForm, area_ha: e.target.value })} />
          <TextField label="Ano Safra" fullWidth margin="dense" value={lotForm.crop_year} onChange={e => setLotForm({ ...lotForm, crop_year: e.target.value })} />
          <Button variant="contained" onClick={handleLot} sx={{ mt: 2 }}>Próximo</Button>
        </Box>
      )}

      {active === 3 && (
        <Box>
          <TextField label="Data Plantio" fullWidth margin="dense" value={cropForm.planted_date} onChange={e => setCropForm({ ...cropForm, planted_date: e.target.value })} />
          <TextField label="Data Colheita" fullWidth margin="dense" value={cropForm.harvested_date} onChange={e => setCropForm({ ...cropForm, harvested_date: e.target.value })} />
          <TextField label="Sacas" fullWidth margin="dense" value={cropForm.yield_bags} onChange={e => setCropForm({ ...cropForm, yield_bags: e.target.value })} />
          <Button variant="contained" onClick={handleCrop} sx={{ mt: 2 }}>Concluir</Button>
        </Box>
      )}

      {active === 4 && (
        <Typography sx={{ mt: 2 }}>Cadastro concluído!</Typography>
      )}
    </Box>
  );
};

export default SetupWizard;