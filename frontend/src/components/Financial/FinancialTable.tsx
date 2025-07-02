import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
interface Props {
  records: FinancialRecord[];
  onEdit: (rec: FinancialRecord) => void;
  onDelete: (id: number) => void;
}

const FinancialTable: React.FC<Props> = ({ records, onEdit, onDelete }) => {
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

export default FinancialTable;