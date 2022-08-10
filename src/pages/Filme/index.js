import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css';
import { toast } from 'react-toastify';

import api from '../../services/api'

function Filme() {
    const{ id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '0383aeab6c23f8faa1ab5af96c0c9955',
                    language: 'pt-BR'
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme não encontrado")
                navigate('/', {replace: true})
                return;
            })
        }

        loadFilme();

        return() => {
            console.log('saiu')
        }

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@xrauber");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilmes){
            toast.warn("Esse filme já está na lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@xrauber", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }


    if(loading){
        return(
            <div className='filme-info'>
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação {filme.vote_average.toFixed(1)} /10</strong>

            <div className='area-button'>
                <button onClick={salvarFilme}>
                    Colocar na Lista
                </button>
                <button>
                    <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} alt=''>
                        Trailer do filme
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;