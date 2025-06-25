import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
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

const LotsTable: React.FC<Props> = ({ lots, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Área (ha)</TableCell>
          <TableCell>Ano Safra</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lots.map(l => (
          <TableRow key={l.id}>
            <TableCell>{l.name}</TableCell>
            <TableCell>{l.area_ha}</TableCell>
            <TableCell>{l.crop_year}</TableCell>
            <TableCell>
              <IconButton size="small" onClick={() => onEdit(l)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => onDelete(l.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LotsTable;