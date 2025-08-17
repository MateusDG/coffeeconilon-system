import React from 'react';
import { Box, IconButton } from '@mui/material';
import { formatDate, formatNumber } from '../../utils/format';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

interface Props {
  records: StockRecord[];
  onEdit: (record: StockRecord) => void;
  onDelete: (id: number) => void;
}

const InventoryTable: React.FC<Props> = ({ records, onEdit, onDelete }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'product', headerName: 'Produto', flex: 1 },
      { field: 'movement', headerName: 'Movimento', flex: 1 },
      {
        field: 'quantity',
        headerName: 'Quantidade',
        flex: 1,
        valueFormatter: (p) => formatNumber(typeof p.value === 'number' ? p.value : Number(p.value ?? 0), 3),
      },
      { field: 'unit', headerName: 'Unidade', flex: 1 },
      { field: 'date', headerName: 'Data', flex: 1, valueFormatter: (p) => formatDate((p.value as string) ?? '') },
      {
        field: 'lot_id',
        headerName: 'Lote',
        flex: 1,
        valueGetter: (params) => (params?.row?.lot_id ?? ''),
      },
      {
        field: 'actions',
        headerName: 'Ações',
        sortable: false,
        filterable: false,
        renderCell: params => (
          <>
            <IconButton size="small" onClick={() => onEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ),
      },
    ],
    [onEdit, onDelete],
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
