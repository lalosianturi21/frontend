import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetail from "../Components/BookDetail";

// import BookList from "../Components/BookList";
import Favorites from "../Components/Favorites";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";



const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {logado && <Route path="/" exact element={<Home />} />}
                {!logado && <Route path="/" element={<Login logado={logado} />} />}
                {!logado && <Route path="/register" element={<Register logado={logado} />} />}
              
                <Route path="/favorites" element={<Favorites />}  />
                <Route path="/book/:id" element={<BookDetail />}  />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;