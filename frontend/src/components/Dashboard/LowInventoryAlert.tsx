import React from 'react';
import { Alert, AlertTitle, Chip, Stack } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { StockRecord } from '../Inventory/InventoryTable';

interface Props {
  stocks: StockRecord[];
  threshold?: number; // minimal safe quantity
  action?: React.ReactNode;
}

const LowInventoryAlert: React.FC<Props> = ({ stocks, threshold = 5, action }) => {
  const low = React.useMemo(() => {
    const totals = new Map<string, { qty: number; unit: string }>();
    stocks.forEach((s) => {
      const prev = totals.get(s.product) || { qty: 0, unit: s.unit };
      const delta = s.movement === 'OUT' ? -Number(s.quantity) : Number(s.quantity);
      totals.set(s.product, { qty: prev.qty + delta, unit: s.unit || prev.unit });
    });
    return Array.from(totals.entries())
      .map(([product, { qty, unit }]) => ({ product, qty, unit }))
      .filter((i) => i.qty >= 0 && i.qty < threshold)
      .sort((a, b) => a.qty - b.qty)
      .slice(0, 5);
  }, [stocks, threshold]);

  if (low.length === 0) return null;

  return (
    <Alert icon={<WarningAmberIcon />} severity="warning" sx={{ borderRadius: 2 }} action={action}>
      <AlertTitle>Estoque baixo (limite: {threshold})</AlertTitle>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {low.map((i) => (
          <Chip
            key={i.product}
            color="warning"
            variant="outlined"
            label={`${i.product}: ${i.qty} ${i.unit}`}
            size="small"
          />
        ))}
      </Stack>
    </Alert>
  );
};

export default LowInventoryAlert;
