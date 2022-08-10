import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import './style.css'
import { FaSearch } from "react-icons/fa"

function Header() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    async function getMovie(query){
        const res = await api.get("search/movie",{
            params:{
                api_key:'0383aeab6c23f8faa1ab5af96c0c9955',
                language: 'pt-BR',
                page: 1,
                query
            }
        })
        setMovies(res.data.results)
    }

    useEffect(() => {
        if(query){
            getMovie(query)
        }
        else{
            setMovies('')
        } 
    }, [query])  
    
    return(
        <header>
            <div className='logo'>
                <Link className='linkLogo' to='/'>Moviber</Link>
            </div>
            <div className='menuRight'>
                <section className='menuSearch'>
                    <article className='localSearch'>
                        <FaSearch style={{color: 'white', fontSize: '20px'}}/>
                        <input type='text' className='inputSearch' placeholder='Procure pelo seu filme aqui' onChange={ (e) => setQuery(e.target.value)} />      
                    </article>          
                    <ul className='returnSearch'>
                        {
                            movies && (
                                movies.map(movie => (
                                    <li className='resultSearch'>
                                        <a href={`/filme/${movie.id}`} alt='Redirecionamento para página de descrição do filme'>{movie.title}</a>
                                        <hr/>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </section>
                <Link className='lista' to='/lista'>Minha lista</Link>
            </div>
        </header>
    );
}

export default Header;