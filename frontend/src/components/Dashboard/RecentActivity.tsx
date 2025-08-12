import React from 'react';
import {
  Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Box,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FinancialRecord } from '../Financial/FinancialTable';
import { StockRecord } from '../Inventory/InventoryTable';

interface Props {
  financial: FinancialRecord[];
  stocks: StockRecord[];
}

type ActivityItem = {
  id: string;
  type: 'financial' | 'stock';
  title: string;
  description: string;
  date: string;
};

const RecentActivity: React.FC<Props> = ({ financial, stocks }) => {
  const items: ActivityItem[] = React.useMemo(() => {
    const fin = financial.map((f) => ({
      id: `f-${f.id}`,
      type: 'financial' as const,
      title: `${f.type} · ${f.category}`,
      description: `${(f.value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}${f.description ? ` — ${f.description}` : ''}`,
      date: f.date,
    }));
    const stk = stocks.map((s) => ({
      id: `s-${s.id}`,
      type: 'stock' as const,
      title: `${s.movement} · ${s.product}`,
      description: `${s.quantity} ${s.unit}`,
      date: s.date,
    }));
    return [...fin, ...stk]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [financial, stocks]);

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6">Atividades recentes</Typography>
        </Box>
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Sem atividades ainda. Comece registrando um lançamento ou movimento de estoque.</Typography>
        ) : (
          <List>
            {items.map((it) => (
              <ListItem key={it.id} divider>
                <ListItemIcon>
                  {it.type === 'financial' ? <AttachMoneyIcon color="primary" /> : <InventoryIcon color="secondary" />}
                </ListItemIcon>
                <ListItemText
                  primary={it.title}
                  secondary={new Date(it.date).toLocaleDateString('pt-BR') + ' · ' + it.description}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

