import React from "react";
import './styles.css'
import logo from '../components/Header/logoPurple.jpeg'
import { useNavigate } from "react-router-dom";

export default function Discover(){
    const navigate = useNavigate()

    const navAndRefresh = () => {
        navigate('/home')
        window.location.reload();
    }
    
    return(
        <div className="bothSides">
            <div className="rigthSide">
                <img src={logo} alt='logo'/>
                <span>Desenvolvido por Tullio Rauber. 2022.</span>
            </div>
            <div className="leftSide">
                <strong>MOVIBER</strong>
                <div>Moviber é um projeto de catálogo de filmes em cartaz e referente aos filmes atualmente mais populares, com busca habilitada para busca de qualquer filme. Sendo um projeto simples em React.JS criado para exploração de recursos do React como Hooks, bibliotecas como "react-router-dom", "react-toastify" e "tailwind", fazendo consumo de API com axios.</div>
                <button onClick={() => navAndRefresh()}>Ir para o projeto</button>
            </div>
        </div>
    )
}