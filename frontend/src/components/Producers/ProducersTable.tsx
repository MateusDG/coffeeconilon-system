import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Producer {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
}

interface Props {
  producers: Producer[];
  onEdit: (producer: Producer) => void;
  onDelete: (id: number) => void;
}

const ProducersTable: React.FC<Props> = ({ producers, onEdit, onDelete }) => {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Nome', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      {
        field: 'is_active',
        headerName: 'Ativo',
        flex: 0.5,
        valueFormatter: params => (params.value ? 'Sim' : 'Não'),
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
        rows={producers}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ProducersTable;