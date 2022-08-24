import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Header from "./pages/components/Header";
import Lista from "./pages/Lista";
import Erro from "./pages/Erro";
import Discover from "./pages/Discover";


function RoutesApp(){
    return(
        <BrowserRouter>
        {window.location.pathname !== "/" ? (
            <Header/>
        ) : null}
            <Routes>
                <Route path='/' element={<Discover/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/filme/:id' element={<Filme/>}/>
                <Route path='/lista' element={<Lista/>} />
                <Route path='*' element={<Erro/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;