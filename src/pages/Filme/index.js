import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";
import { toast } from "react-toastify";
import { Typography, Rating } from '@mui/material';

import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "0383aeab6c23f8faa1ab5af96c0c9955",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("saiu");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@xrauber");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilmes = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilmes) {
      toast.warn("Esse filme já está na lista!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@xrauber", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <div className="imgAndDescription">
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt={filme.title}
        />
        
        <article className="description">
          <h3>SINOPSE</h3>
          <p>{filme.overview}</p>
          {/* <strong>Avaliação {filme.vote_average.toFixed(1)} /10</strong> */}
          <div className="rating">
            <Typography style={{textAlign: 'center'}} component="legend">Avaliação {filme.vote_average.toFixed(1)}</Typography>
            <Rating name="customized-10" precision={0.1} defaultValue={filme.vote_average.toFixed(1)} max={10} readOnly/>
          </div>

          <div className="area-button">
            <button onClick={salvarFilme}>Colocar na Lista</button>

            <a
              target="blank"
              rel="external"
              href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
              alt=""
            >
              Trailer do filme
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Filme;
