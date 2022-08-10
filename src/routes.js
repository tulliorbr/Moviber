import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Header from "./pages/components/Header";
import Lista from "./pages/Lista";
import Erro from "./pages/Erro";

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/filme/:id' element={<Filme/>}/>
                <Route path='/lista' element={<Lista/>} />

                <Route path='*' element={<Erro/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;