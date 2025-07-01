import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Crop {
  id: number;
  lot_id: number;
  planted_date: string;
  harvested_date?: string;
  yield_bags?: number;
}

interface Props {
  crops: Crop[];
  onEdit: (crop: Crop) => void;
  onDelete: (id: number) => void;
}

const CropsTable: React.FC<Props> = ({ crops, onEdit, onDelete }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'lot_id', headerName: 'Lote', flex: 1 },
      { field: 'planted_date', headerName: 'Plantio', flex: 1 },
      { field: 'harvested_date', headerName: 'Colheita', flex: 1 },
      { field: 'yield_bags', headerName: 'Sacas', flex: 1 },
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
        rows={crops}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default CropsTable;