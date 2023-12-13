import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[] | null>(null);
  const [proximaPagina, setProximaPagina] = useState<string | null>(null);

  useEffect(() => {
    //obter os restaurantes da API
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/').then((resposta) => {
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
    });
  }, []);

  function verMais() {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina!).then((resposta) => {
      setRestaurantes([...restaurantes!, ...resposta.data.results]);
      setProximaPagina(resposta.data.next);
    });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>Ver mais restaurantes</button>}
    </section>
  );
};

export default ListaRestaurantes;
