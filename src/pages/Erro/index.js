import React from 'react';
import { Link } from 'react-router-dom'
import './erro.css'

function Erro() {
    return(
        <div className='notFound'>
            <h1>Error 404.</h1>
            <h2>Página não encontrada</h2>
            <Link to='/' className='bottom'>Veja todos os filmes!</Link>
        </div>
    )
}

export default Erro;