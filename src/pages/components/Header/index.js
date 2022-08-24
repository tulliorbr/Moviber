import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './style.css'
import { FaSearch } from "react-icons/fa"
import logo from './logo.jpeg'

function Header() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()

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

    const navAndRefresh = () => {
        navigate('/')
        window.location.reload();
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
            <Link to='/home' className='linkLogo'>
                <img src={logo} alt='logo'/>
            </Link>
            <div className='centerButtons'>
                <Link className='buttonHome' to='/home'>Home</Link>
                <Link className='buttonList' to='/lista'>Minha lista</Link>
                <button onClick={() => navAndRefresh()} className='buttonDiscover'>Discover</button>
            </div>
            <section className='menuSearch'>
                <article className='localSearch'>
                    <FaSearch style={{color: 'white', fontSize: '20px', marginRight: '10px'}}/>
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
        </header>
    );
}

export default Header;