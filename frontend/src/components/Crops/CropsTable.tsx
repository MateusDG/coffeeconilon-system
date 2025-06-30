import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
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

const CropsTable: React.FC<Props> = ({ crops, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Lote</TableCell>
          <TableCell>Plantio</TableCell>
          <TableCell>Colheita</TableCell>
          <TableCell>Sacas</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {crops.map(c => (
          <TableRow key={c.id}>
            <TableCell>{c.lot_id}</TableCell>
            <TableCell>{c.planted_date}</TableCell>
            <TableCell>{c.harvested_date}</TableCell>
            <TableCell>{c.yield_bags}</TableCell>
            <TableCell>
              <IconButton size="small" onClick={() => onEdit(c)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => onDelete(c.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CropsTable;