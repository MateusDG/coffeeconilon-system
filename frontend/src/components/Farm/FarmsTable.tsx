import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
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

const FarmsTable: React.FC<Props> = ({ farms, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Localização</TableCell>
          <TableCell>Produtor</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {farms.map(f => (
          <TableRow key={f.id}>
            <TableCell>{f.name}</TableCell>
            <TableCell>{f.location}</TableCell>
            <TableCell>{f.owner_id}</TableCell>
            <TableCell>
              <IconButton size="small" onClick={() => onEdit(f)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => onDelete(f.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FarmsTable;