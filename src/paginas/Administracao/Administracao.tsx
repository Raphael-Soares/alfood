import React, { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from 'plugins/axios';

export default function Administracao() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('/restaurantes/').then((resposta) => {
      setRestaurantes(resposta.data);
    });
  }, []);

  function excluirRestaurante(id: number) {
    http.delete(`/restaurantes/${id}/`).then((resposta) => {
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
                <Link to={`/admin/restaurantes/${restaurante.id}`}>
                  <Button variant='outlined'>editar</Button>
                </Link>
              </TableCell>

              <TableCell>
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
