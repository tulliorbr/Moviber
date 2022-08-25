import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import './home.css'

//https://api.themoviedb.org/3/movie/550?api_key=0383aeab6c23f8faa1ab5af96c0c9955

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState (true)

    const [filmesPopular, setFilmesPopular] = useState([]);
    const [loadingPopular, setLoadingPopular] = useState (true)

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:'0383aeab6c23f8faa1ab5af96c0c9955',
                    language: 'pt-BR',
                    page: 1 
                }
            })
            //console.log(response.data.results.slice(0,20))
            setFilmes(response.data.results.slice(0,40));
            setLoading(false);
        }
        loadFilmes()
    }, [])

    //Lista de filmes populares
    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/popular",{
                params:{
                    api_key:'0383aeab6c23f8faa1ab5af96c0c9955',
                    language: 'pt-BR',
                    page: 4 
                }
            })
            setFilmesPopular(response.data.results.slice(0,20));
            setLoadingPopular(false);
        }
        loadFilmes()
    }, [])

    if(loading || loadingPopular){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    const slideLeftNowPlaying = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 1000
    }

    const slideRightNowPlaying = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 1000
    }

    const slideLeftPopular = () => {
        var slider = document.getElementById('sliderPopular');
        slider.scrollLeft = slider.scrollLeft - 1000
    }

    const slideRightPopular = () => {
        var slider = document.getElementById('sliderPopular');
        slider.scrollLeft = slider.scrollLeft + 1000
    }

    return (
        <>
            <strong className='titlesSection'>FILMES EM CARTAZ</strong>
            <div className='global relative flex items-center'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideLeftNowPlaying} />
                    <div id='slider' 
                    className='listaFilmes w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                        {filmes.map((filme) => {
                            return(
                                <article key={filme.id}>
                                    <strong>{filme.title}</strong>
                                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                    <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                </article>
                            )
                        })}
                    </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideRightNowPlaying} />
            </div>
            <strong className='titlesSection'>FILMES POPULARES</strong>
            <div className='global relative flex items-center'>
            <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideLeftPopular} />
                <div id='sliderPopular' 
                className='listaFilmes w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {filmesPopular.map((filme) => {
                        return(
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
            <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideRightPopular} />
        </div>
    </>
    )
}

export default Home;