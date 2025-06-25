import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface SummaryCardProps {
  icon: React.ReactElement;
  label: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, label, value }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography variant="h6">{label}</Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default SummaryCard;