import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import './home.css'

//https://api.themoviedb.org/3/movie/550?api_key=0383aeab6c23f8faa1ab5af96c0c9955

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState (true)

    useEffect(() => {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:'0383aeab6c23f8faa1ab5af96c0c9955',
                    language: 'pt-BR',
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results.slice(0,19));
            setLoading(false);
        }

        loadFilmes()

    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 1000
    }

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 1000
    }

    return (
        <div className='global relative flex items-center'>
            <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideLeft} />
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
            <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' size={40} onClick={slideRight} />
        </div>
    )
}

export default Home;