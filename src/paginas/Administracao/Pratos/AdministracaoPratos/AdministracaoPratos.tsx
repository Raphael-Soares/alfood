import { useEffect, useState } from 'react';
import IPrato from 'interfaces/IPrato';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from 'plugins/axios';

export default function AdministracaoPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('/pratos/').then((resposta) => {
      setPratos(resposta.data);
    });
  }, []);

  function excluirPrato(id: number) {
    http.delete(`/pratos/${id}/`).then((resposta) => {
      setPratos(pratos.filter((prato) => prato.id !== id));
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prato</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>

            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target='_blank' rel='noreferrer'>
                  Ver imagem
                </a>
              </TableCell>
              <TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>
                  <Button variant='outlined'>editar</Button>
                </Link>
              </TableCell>

              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluirPrato(prato.id)}>
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
