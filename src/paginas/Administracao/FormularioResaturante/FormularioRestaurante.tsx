import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FormularioRestaurante() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/v2/restaurantes/${id}/`).then((resposta) => {
        setNome(resposta.data.nome);
        console.log(resposta.data);
      });
    }
  }, [id]);

  const [nome, setNome] = useState('');

  function onSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {
        nome: nome
      });
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nome
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label='Nome do Restaurante'
        variant='standard'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Button variant='contained' color='primary' type='submit'>
        Salvar
      </Button>
    </form>
  );
}
