import React, { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Link } from 'react-router-dom';

export default function Administracao() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/').then((resposta) => {
      setRestaurantes(resposta.data);
    });
  }, []);

  function excluirRestaurante(id: number) {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${id}/`).then((resposta) => {
      setRestaurantes(restaurantes.filter((restaurante) => restaurante.id !== id));
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Restaurante</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>[editar]</Link>
                <Button variant='outlined' color='error' onClick={() => excluirRestaurante(restaurante.id)}>
                  excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
