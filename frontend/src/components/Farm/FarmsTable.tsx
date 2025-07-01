import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Farm {
  id: number;
  name: string;
  location?: string;
  owner_id: number;
}

interface Props {
  farms: Farm[];
  onEdit: (farm: Farm) => void;
  onDelete: (id: number) => void;
}
const FarmsTable: React.FC<Props> = ({ farms, onEdit, onDelete }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Nome', flex: 1 },
      { field: 'location', headerName: 'Localização', flex: 1 },
      { field: 'owner_id', headerName: 'Produtor', flex: 1 },
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
        rows={farms}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default FarmsTable;