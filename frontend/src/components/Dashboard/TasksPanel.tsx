import React from 'react';
import {
  Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Chip,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link as RouterLink } from 'react-router-dom';
import type { FinancialRecord } from '../Financial/FinancialTable';
import type { StockRecord } from '../Inventory/InventoryTable';
import type { Lot } from '../Lots/LotsTable';
import type { Farm } from '../Farm/FarmsTable';

interface Props {
  usersCount: number;
  financial: FinancialRecord[];
  stocks: StockRecord[];
  farms: Farm[];
  lots: Lot[];
}

const TasksPanel: React.FC<Props> = ({ usersCount, financial, stocks, farms, lots }) => {
  const tasks = React.useMemo(() => {
    const list: { to: string; icon: React.ReactElement; title: string; hint: string }[] = [];
    if (!farms || farms.length === 0) {
      list.push({ to: '/farms', icon: <AgricultureIcon color="primary" />, title: 'Cadastre sua primeira fazenda', hint: 'Defina propriedades para organizar lotes e safras.' });
    }
    if (!lots || lots.length === 0) {
      list.push({ to: '/lots', icon: <AddchartIcon color="primary" />, title: 'Crie seu primeiro lote', hint: 'Lotes permitem acompanhar produtividade por área.' });
    }
    if (!financial || financial.length === 0) {
      list.push({ to: '/financial', icon: <AssignmentIcon color="primary" />, title: 'Registre seu primeiro lançamento', hint: 'Entradas e saídas alimentam KPIs e relatórios.' });
    }
    if (!stocks || stocks.length === 0) {
      list.push({ to: '/inventory', icon: <Inventory2Icon color="primary" />, title: 'Adicione um movimento de estoque', hint: 'Controle insumos e produtos acabados.' });
    }
    if (usersCount <= 1) {
      list.push({ to: '/producers', icon: <PersonAddAltIcon color="primary" />, title: 'Cadastre produtores/usuários', hint: 'Permissões e responsabilidades por usuário.' });
    }
    return list.slice(0, 5);
  }, [usersCount, financial, stocks, farms, lots]);

  if (tasks.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Tarefas recomendadas</Typography>
        <List>
          {tasks.map((t, idx) => (
            <ListItem key={idx} component={RouterLink} to={t.to} sx={{ borderRadius: 2 }} divider>
              <ListItemIcon>{t.icon}</ListItemIcon>
              <ListItemText primary={t.title} secondary={t.hint} />
              <Chip size="small" label="Ir" color="primary" variant="outlined" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TasksPanel;

