import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Lot {
  id: number;
  name: string;
  area_ha: number;
  farm_id: number;
  crop_year?: number;
}

interface Props {
  lots: Lot[];
  onEdit: (lot: Lot) => void;
  onDelete: (id: number) => void;
}

const LotsTable: React.FC<Props> = ({ lots, onEdit, onDelete }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Nome', flex: 1 },
      { field: 'area_ha', headerName: 'Área (ha)', flex: 1 },
      { field: 'crop_year', headerName: 'Ano Safra', flex: 1 },
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
        rows={lots}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default LotsTable;