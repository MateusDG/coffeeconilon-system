import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface FinancialRecord {
  id: number;
  type: string;
  category: string;
  description?: string;
  value: number;
  date: string;
  crop_id?: number;
  lot_id?: number;
}
const FinancialTable: React.FC<{ records: FinancialRecord[] }> = ({ records }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'type', headerName: 'Tipo', flex: 1 },
      { field: 'category', headerName: 'Categoria', flex: 1 },
      { field: 'description', headerName: 'Descrição', flex: 1 },
      { field: 'value', headerName: 'Valor', flex: 1 },
      { field: 'date', headerName: 'Data', flex: 1 },
      {
        field: 'lot_id',
        headerName: 'Lote',
        flex: 1,
        valueGetter: params => params.row.lot_id ?? '',
      },
    ],
    [],
  );

  return (
    <Box sx={{ mt: 2 }}>
      <DataGrid
        rows={records}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default FinancialTable;