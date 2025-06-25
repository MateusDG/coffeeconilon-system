import React from 'react';
import { Paper } from '@mui/material';

const ReportView: React.FC<{ data: any }> = ({ data }) => (
  <Paper sx={{ p: 2 }}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Paper>
);

export default ReportView;