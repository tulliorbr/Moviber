import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './lista.css';
import { toast } from 'react-toastify'

function Lista() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@xrauber")
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes=filmes.filter( (item) => {
            return(item.id !== id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@xrauber", JSON.stringify(filtroFilmes))
        toast.success("Filme removido da lista com sucesso!")
    }

    return(
        <div className='meusFilmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span className='noList'>Você não possuí nenhum filme da lista!</span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>
                                {item.title}
                            </span>
                            <div>
                                <Link to={`/filme/${item.id}}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Lista;