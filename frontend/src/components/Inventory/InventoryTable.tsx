import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface StockRecord {
  id: number;
  product: string;
  movement: string;
  quantity: number;
  unit: string;
  date: string;
  crop_id?: number;
  lot_id?: number;
}

const InventoryTable: React.FC<{ records: StockRecord[] }> = ({ records }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'product', headerName: 'Produto', flex: 1 },
      { field: 'movement', headerName: 'Movimento', flex: 1 },
      { field: 'quantity', headerName: 'Quantidade', flex: 1 },
      { field: 'unit', headerName: 'Unidade', flex: 1 },
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

export default InventoryTable;